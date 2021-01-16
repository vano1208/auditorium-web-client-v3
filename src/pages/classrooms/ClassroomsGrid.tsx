import React from "react";
import {Classroom} from "../../models/models";
import GridElement from "../../components/gridElement/GridElement";
import styles from "./classroomsGrid.module.css";
import PopupClassroom from "../../components/popupClassroom/PopupClassroom";
import Caviar from "../../components/caviar/Caviar";
import Filters from "../../components/filters/Filters";
import PageHeader from "../../components/pageHeader/PageHeader";

type PropTypes = {
  classrooms: Array<Classroom>;
  onFilterChange: (value: string) => void;
  withWing: boolean;
  setWithWing: (prevState: any) => void;
  onlyOperaStudio: boolean
  setOnlyOperaStudio: (prevState: any) => void;
  classroomsFilter: (classroom: Classroom) => boolean;
  readyForRewriting: boolean
  setReadyForRewriting: (prevState: any) => void;
  onClose: (value: string) => void;
  visibility: string
};

const ClassroomsGrid: React.FC<PropTypes> = React.memo((
  {
    classrooms,
    onFilterChange,
    withWing,
    setWithWing,
    onlyOperaStudio,
    setOnlyOperaStudio,
    classroomsFilter,
    readyForRewriting,
    setReadyForRewriting,
    onClose,
    visibility
  }) => {

  return (
    <>
      <PageHeader body="Аудиторії">
        <Filters onChange={onFilterChange}/>
        <div className={styles.conditionalFilters}>
          <label htmlFor="wing" className={styles.checkboxLabel}>
            Флігель
            <input type="checkbox"
                   name="wing"
                   id="wing"
                   checked={withWing}
                   onChange={() => setWithWing((prevState: any) => !prevState)}/><span></span>
          </label>
          <label htmlFor="operaStudio" className={styles.checkboxLabel}>
            Тільки оперна студія
            <input type="checkbox"
                   name="operaStudio"
                   id="operaStudio"
                   checked={onlyOperaStudio}
                   onChange={() => setOnlyOperaStudio((prevState: any) => !prevState)}/>
            <span></span>
          </label>
        </div>
      </PageHeader>
      <Caviar
        classroomsFilter={classroomsFilter}
        classrooms={classrooms.filter((classroom) => onlyOperaStudio ? classroom.isOperaStudio : true)
          .filter((classroom) => classroom.isWing ? withWing : true)}
        onClose={onClose}
      />
      <PopupClassroom
        classrooms={classrooms}
        visibility={visibility}
        onClose={onClose}
        readyForRewriting={readyForRewriting}
        setReadyForRewriting={setReadyForRewriting}
      />
      <div className={styles.classrooms}>
        {classrooms
          .slice()
          .filter((classroom) => onlyOperaStudio ? classroom.isOperaStudio : true)
          .filter((classroom) => classroom.isWing ? withWing : true)
          .sort((a: Classroom, b: Classroom) => Number(a.name) - Number(b.name)).filter(classroomsFilter)
          .map((classroom: Classroom) => (
            <GridElement
              key={classroom.id}
              classroom={classroom}
              onClose={onClose}
            />
          ))}
      </div>
    </>
  );
});

export default ClassroomsGrid;