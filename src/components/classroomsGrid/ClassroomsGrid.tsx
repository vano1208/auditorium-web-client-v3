import React, {useState} from "react";
import {Classroom} from "../../models/models";
import GridElement from "./gridElement/GridElement";
import styles from "./classroomsGrid.module.css";
import PopupClassroom from "./popupClassroom/PopupClassroom";
import Caviar from "./caviar/Caviar";
import Filters from "./filters/Filters";
import PageHeader from "../pageHeader/PageHeader";

type PropTypes = {
  classrooms: Array<Classroom>;
};

const ClassroomsGrid: React.FC<PropTypes> = ({classrooms}) => {
  const [filter, setFilter] = useState("ALL");
  const [withWing, setWithWing] = useState(true);
  const [onlyOperaStudio, setOnlyOperaStudio] = useState(false);
  const [readyForRewriting, setReadyForRewriting] = useState(false)
  let classroomsFilter =
    filter === "FREE"
      ? (classroom: Classroom) => classroom.occupied === null
      : filter === "SPECIAL"
      ? (classroom: Classroom) => classroom.special !== null
      : filter === "CHAIR"
        ? (classroom: Classroom) => classroom.chair !== null
        : () => true;
  let [visibility, setVisibility] = useState("none");
  const onClose = (value: string) => {
    setReadyForRewriting(false);
    setVisibility(value);
  };
  const onFilterChange = (value: string) => {
    setFilter(() => value);
  };
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
                 onChange={() => setWithWing(prevState => !prevState)}/><span></span>
        </label>
        <label htmlFor="operaStudio" className={styles.checkboxLabel}>
          Тільки оперна студія
          <input type="checkbox"
                 name="operaStudio"
                 id="operaStudio"
                 checked={onlyOperaStudio}
                 onChange={() => setOnlyOperaStudio(prevState => !prevState)}/>
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
};

export default ClassroomsGrid;
