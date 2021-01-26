import React from "react";
import styles from "./userPopup.module.css";
import { User, userTypes, userTypesUa } from "../../models/models";
import PopupWindow from "../popupWindow/PopupWindow";
import Button from "../button/Button";
import { useMutation, useQuery } from "@apollo/client";
import { VERIFY_USER } from "../../api/operations/queries/verifyUser";
import { GET_USER_BY_ID } from "../../api/operations/queries/users";
import { useParams } from "react-router-dom";

interface PropTypes {
  visibility: string;
  onClose: (value: string) => void;
  userData?: User;
  meType: string;
}

interface Params {
  userId: string;
}

const UserPopup: React.FC<PropTypes> = ({ visibility, onClose, meType}) => {
  const { userId } = useParams<Params>();

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: {
      id: Number(userId),
    },
  });
  const [verifyUser] = useMutation(VERIFY_USER, {
    variables: {
      input: {
        userId: Number(userId),
      },
    },
  });
  if (loading || error) return null;
  const {
    firstName,
    lastName,
    patronymic,
    type,
    department,
    phoneNumber,
    email,
    id,
    verified,
    startYear,
    degree,
  } = data.user;
  const fullName = [lastName, firstName, patronymic].join(" ");
  const typeUa = userTypesUa[type as userTypes];
  const verify = () => {
    onClose("none");
    verifyUser().then((r) => {
      if (r.data.verifyUser.userErrors.length === 0) {
      }
    });
  };
  return (
    <PopupWindow
      headerBody={[fullName, "—", typeUa].join(" ")}
      onClose={onClose}
      visibility={visibility}
    >
      <div className={styles.info}>
        <p>Номер користувача: {id}</p>
        <p>{department}</p>
        {type === userTypes.STUDENT || type === userTypes.POST_GRADUATE ? (
          <p>Ступінь: {degree}</p>
        ) : null}
        {type === userTypes.STUDENT || type === userTypes.POST_GRADUATE ? (
          <p>Рік початку навчання: {startYear}</p>
        ) : null}
        <p>
          Тел.: <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
        </p>
        <p>
          E-mail: <a href={`mailto:${email}`}>{email}</a>
        </p>
      </div>
      {meType === userTypes.ADMIN && !verified && (
        <div className={styles.verificationDiv}>
          <p className={styles.verificationAlert}>
            Увага! Перед верифікацією звірте правильність даних з офіційним
            документом!
          </p>
          <Button onClick={verify}>Верифікувати користувача</Button>
        </div>
      )}
    </PopupWindow>
  );
};

export default UserPopup;
