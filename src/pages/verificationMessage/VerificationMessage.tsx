import React, { useEffect, useState } from "react";
import styles from "./verificationMessage.module.css";
import Button from "../../components/button/Button";
import { client } from "../../api/client";
import { GET_USER_BY_ID } from "../../api/operations/queries/users";

interface PT {
  setIsLogged: (value: boolean) => void;
}

const VerificationMessage: React.FC<PT> = ({ setIsLogged }) => {
  const [userName, setUserName] = useState("");
  const getUser = async () => {
    const { data, loading, error } = await client.query({
      query: GET_USER_BY_ID,
      variables: {
        id: Number(sessionStorage.getItem("userId")),
      },
    });
    setUserName(data.user.firstName);
  };
  useEffect(() => {
    getUser();
  });
  return (
    <div className={styles.verificationMessage}>
      <div className={styles.verificationMessageBody}>
        <h2>{userName}, вітаємо! Реєстрація пройшла успішно!</h2>
        <p>Для користування програмою необхідно підтвердити свої дані.</p>
        <p>
          Пройти верифікацію Ви можете на другому поверсі НМАУ в учбовій
          частині.
        </p>
        <p>Щоб підтвердити дані, вкажіть диспетчеру свій номер користувача.</p>
        <h1>
          Ваш номер: <span>{sessionStorage.getItem("userId")}</span>
        </h1>
        <p>Після підтвердження перезавантажте сторінку.</p>
        <Button
          onClick={() => {
            sessionStorage.removeItem("userId");
            localStorage.removeItem("userId");
            setIsLogged(false);
          }}
        >
          Вийти з аккаунту
        </Button>
      </div>
    </div>
  );
};

export default VerificationMessage;
