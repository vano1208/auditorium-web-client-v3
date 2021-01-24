import React from "react";
// import styles from "./userPopup.module.css";
import {User, userTypes, userTypesUa} from "../../models/models";
import PopupWindow from "../popupWindow/PopupWindow";

interface PropTypes {
  visibility: string;
  onClose: (value: string) => void;
  userData: User;
}

const UserPopup: React.FC<PropTypes> = ({visibility, onClose, userData}) => {
  const {firstName, lastName, patronymic, type, department, phoneNumber, email, id} = userData;
  const fullName = [lastName, firstName, patronymic].join(" ");
  const typeUa = userTypesUa[type as userTypes];

  return <PopupWindow headerBody={[fullName, "—", typeUa].join(" ")} onClose={onClose} visibility={visibility}>
    <p>{department}</p>
    <p>Номер користувача: {id}</p>
    <p>Тел.: <a href={`tel:${phoneNumber}`}>{phoneNumber}</a></p>
    <p>E-mail: <a href={`mailto:${email}`}>{email}</a></p>
  </PopupWindow>
};

export default UserPopup;
