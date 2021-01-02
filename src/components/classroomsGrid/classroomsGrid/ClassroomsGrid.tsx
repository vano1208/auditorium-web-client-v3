import React, { useState } from "react";
import { Classroom } from "../../../models/models";
import GridElement from "./gridElement/GridElement";
import styles from "./classroomsGrid.module.css";
import PopupClassroom from "../popupClassroom/PopupClassroom";
import Caviar from "../caviar/Caviar";
import Filters from "../filters/Filters";

type PropTypes = {
  classrooms: Array<Classroom>;
};

const ClassroomsGrid: React.FC<PropTypes> = ({ classrooms }) => {
  let [filter, setFilter] = useState("ALL");
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
    setVisibility(value);
  };
  const onFilterChange = (value: string) => {
    setFilter(() => value);
  };
  return (
    <div className={styles.classroomsContainer}>
      <div className={styles.classroomsHeader}>
        Аудиторії
        <Filters onChange={onFilterChange} />
      </div>
      <Caviar
        classroomsFilter={classroomsFilter}
        classrooms={classrooms}
        onClose={onClose}
      />
      <PopupClassroom
        classrooms={classrooms}
        visibility={visibility}
        onClose={onClose}
      />
      <div className={styles.classrooms}>
        {classrooms
          .slice()
          .sort((a: Classroom, b: Classroom) => Number(a.name) - Number(b.name)).filter(classroomsFilter)
          .map((classroom: Classroom) => (
            <GridElement
              key={classroom.id}
              classroom={classroom}
              onClose={onClose}
            />
          ))}
      </div>
    </div>
  );
};

export default ClassroomsGrid;
