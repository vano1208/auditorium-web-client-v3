import React from "react";
import styles from "./registration.module.css";
import CustomInput from "../customInput/CustomInput";

interface PropTypes {}

const Registration: React.FC<PropTypes> = () => {
  return (
    <div className={styles.registration}>
      <div className={styles.inputGroup}>
        <CustomInput
          theme="dark"
          label="Прізвище:"
          name="lastName"
          id="lastName"
        />
      </div>
      <div className={styles.inputError}><p>Невірний формат номеру</p></div>
      <div className={styles.inputGroup}>
        <CustomInput
          theme="dark"
          label="Ім'я:"
          name="firstName"
          id="firstName"
        />
      </div>
      <div className={styles.inputGroup}>
        <CustomInput
          theme="dark"
          label="По-батькові:"
          name="patronymic"
          id="patronymic"
        />
      </div>
      <div className={styles.inputGroup}>
        <CustomInput
          theme="dark"
          label="Пароль:"
          name="password"
          id="password"
          type="password"
        />
      </div>
      <div className={styles.inputGroup}>
        <CustomInput
          theme="dark"
          label="Повтор паролю:"
          name="passwordRepeat"
          id="passwordRepeat"
          type="password"
        />
      </div>
      <div className={styles.inputGroup}>
        <CustomInput
          theme="dark"
          label="E-mail:"
          name="email "
          id="email"
        />
      </div>
      <div className={styles.inputGroup}>
        <CustomInput
          theme="dark"
          label="Телефон:"
          name="phoneNumber"
          id="phoneNumber"
        />
      </div>
    </div>

  );
};

export default Registration;
