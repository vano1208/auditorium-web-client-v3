import React from "react";
import styles from "./classroomsGrid.module.css";
import GridElementSkeleton from "./gridElement/GridElementSkeleton";
import PageHeader from "../pageHeader/PageHeader";

const ClassroomsGridSkeleton = () => {
  const classrooms = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <div className={styles.classroomsContainer}>
      <PageHeader body="Аудиторії"/>
      <div className={styles.classrooms}>
        {classrooms.map((classroom) => (
          <GridElementSkeleton key={classroom} />
        ))}
      </div>
    </div>
  );
};

export default ClassroomsGridSkeleton;
