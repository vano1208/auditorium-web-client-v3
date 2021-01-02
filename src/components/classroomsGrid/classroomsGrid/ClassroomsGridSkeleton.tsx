import React from "react";
import styles from "./classroomsGrid.module.css";
import GridElementSkeleton from "./gridElement/GridElementSkeleton";
import Filters from "../filters/Filters";

const ClassroomsGridSkeleton = () => {
  const classrooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <div className={styles.classroomsContainer}>
      <div className={styles.classroomsHeader}>
        Аудиторії
        <Filters onChange={()=>null} />
      </div>
      <div className={styles.classrooms}>
        {classrooms.map((classroom) => (
          <GridElementSkeleton key={classroom} />
        ))}
      </div>
    </div>
  );
};

export default ClassroomsGridSkeleton;
