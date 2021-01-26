import React from "react";
import styles from "./popupMessage.module.css";
import Button from "../button/Button";

interface PT {
  onClose: (value: string) => void;
  headerBody: string;
  visibility: string;
}

const PopupMessage: React.FC<PT> = ({ headerBody, onClose, visibility }) => {
  return (
    <div className={styles.modal} style={{display: visibility}}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          {/*<span onClick={() => onClose("none")} className={styles.close}>*/}
          {/*  &times;*/}
          {/*</span>*/}
          <h2>{headerBody}</h2>
        </div>
        <div className={styles.modalBody}>
          <Button onClick={() => onClose("none")}>Закрити</Button>
        </div>
        <div className={styles.modalFooter}></div>
      </div>
    </div>
  );
};

export default PopupMessage;
