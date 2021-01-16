import React from "react";
import styles from "./register.module.css";

const RegisterSkeleton = () => {
  return (
      <ul id="register">
        <li className={[styles.registerUnitList, styles.listHeader].join(" ")}>
          <div>Аудиторія</div>
          <div>П.І.Б.</div>
          <div>Від</div>
          <div>До</div>
        </li>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(el => (
          <li key={el} className={styles.registerUnitListSkeleton}>
          </li>
        ))}
      </ul>
  );
};

export default RegisterSkeleton;
