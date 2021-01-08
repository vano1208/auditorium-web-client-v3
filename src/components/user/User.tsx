import React from "react";
import styles from "./user.module.css";

interface PropTypes {
  visibility: string;
  onClose: (value: string) => void;
}

const User: React.FC<PropTypes> = ({ visibility, onClose }) => {
  return (
    <div
      style={{ display: visibility }}
      className={styles.modal}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose("none");
        }
      }}
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <span onClick={() => onClose("none")} className={styles.close}>
            &times;
          </span>
          <h2></h2>
        </div>
        <div className={styles.modalBody}></div>
      </div>
    </div>
  );
};

export default User;
