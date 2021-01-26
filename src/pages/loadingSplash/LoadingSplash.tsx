import React from "react";
import styles from "./loadingSplash.module.css";

const LoadingSplash = () => {
  return (
    <div className={styles.loadingSplash}>
      <div className={styles.loadingSplashBody}>
      <h1>Завантаження...</h1>
        <p>Будь ласка, зачекайте!</p>
      </div>
    </div>
  );
};

export default LoadingSplash;
