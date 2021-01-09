import React from "react";
import styles from "./userPopup.module.css";
import {User, userTypes, userTypesUa} from "../../models/models";

interface PropTypes {
  visibility: string;
  onClose: (value: string) => void;
  userData: User;
}

const UserPopup: React.FC<PropTypes> = ({visibility, onClose, userData}) => {
  const {firstName, lastName, patronymic, type, department, phoneNumber, email} = userData;
  const fullName = [lastName, firstName, patronymic].join(" ");
  const typeUa = userTypesUa[type as userTypes];
  return (
    <div
      style={{display: visibility}}
      className={styles.modal}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose("none");
        }
      }}
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{[fullName, "—", typeUa].join(" ")}</h2>
          <span onClick={() => onClose("none")} className={styles.close}>
            &times;
          </span>
          <h2></h2>
        </div>
        <div className={styles.modalBody}>
          <p>{department}</p>
          <p>Тел.: {phoneNumber}</p>
          <p>E-mail: {email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserPopup;
