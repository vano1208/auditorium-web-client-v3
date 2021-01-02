import React from "react";
import styles from "./gridElementSkeleton.module.css";

const GridElementSkeleton = () => {
  return (
    <div className={styles.cell}>
      <div className={styles.cellHeader}>
        <div className={styles.cellName}></div>
          <div className={styles.occupant}>
          </div>
      </div>
      <div className={styles.message}>
        <p></p>
      </div>
    </div>
  );
};

export default GridElementSkeleton;
