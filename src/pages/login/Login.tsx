import React from "react";
import styles from "./login.module.css";
import Logo from "../../components/logo/Logo";
import CustomInput from "../../components/customInput/CustomInput";
import Button from "../../components/button/Button";
import Registration from "../../components/registration/Registration";
import { usePopupWindow } from "../../components/popupWindow/PopupWindowProvider";
import { useNotification } from "../../components/notification/NotificationProvider";

const Login = () => {
  const dispatchNotification = useNotification();
  const dispatchPopupWindow = usePopupWindow();
  const onClick = () => {
    dispatchPopupWindow({
      header: "Реєстрація",
      body: <Registration />,
    });
  };
  const onClickNotification = () => {
    dispatchNotification({
      message: "Hello!",
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <Logo
          title="Auditorium"
          description="Система управління видачею аудиторій"
        />
        <div>
          <p className={styles.loginTip}>
            Увійдіть в систему або зареєструйтесь
          </p>
          <form className={styles.loginForm}>
            <CustomInput
              label="E-mail або логін:"
              name="login"
              id="login"
              placeholder="Наприклад: aud1@knmau.ua"
            />
            <CustomInput
              label="Пароль:"
              name="password"
              id="password"
              type="password"
            />
            <div className={styles.loginButtons}>
              <Button onClick={onClick} color="red">
                Реєстрація
              </Button>
              <Button onClick={onClickNotification} color="blue">
                Увійти
              </Button>
            </div>
          </form>
        </div>
        <footer className={styles.loginFooter}>
          <a href="#">
            Національна Музична Академія України ім. П. і. Чайковського
          </a>
          <p>
            Auditorium &copy; 2021 | v 1.0.4 Ivan Piatovolenko & Vladislav
            Nazarenko
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;
