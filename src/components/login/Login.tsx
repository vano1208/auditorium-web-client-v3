import React, {useState} from "react";
import styles from "./login.module.css";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Button from "../button/Button";
import {useMutation} from "@apollo/client";
import {LOGIN} from "../../api/operations/mutations/login";
import {isLoggedVar} from "../../api/client";
import Registration from "./registration/Registration";

const Login = () => {
  const [login] = useMutation(LOGIN);
  const [visibility, setVisibility] = useState('none');
  return (
    <div className={styles.loginPage}>
      <Registration visibility={visibility} onClose={() => setVisibility("none")}/>
      <div className={styles.form}>
        <h1>AUDITORIUM</h1>
        <a href="https://knmau.com.ua/" target="_blank" rel="noreferrer">
          Національна Музична Академія України ім. П.І. Чайковського
        </a>
        <Formik
          initialValues={{email: "", password: ""}}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              // @ts-ignore
              errors.email = "Обов'язкове поле";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              // @ts-ignore
              errors.email = "Невірна email адреса";
            }
            return errors;
          }}
          onSubmit={(values, {setSubmitting}) => {
            login({
              variables: {
                input: {
                  email: values.email,
                  password: values.password,
                },
              },
            }).then((r: any) => {
              r.data.login.userErrors?.map((error: any) => {
                  console.log(error.message);
                  setSubmitting(false);
                }
              );
              if (r.data.login.token !== null) {
                localStorage.setItem("userId", r.data.login.user.id);
                setSubmitting(false);
                isLoggedVar(true);
              }
            });
          }}
        >
          {({isSubmitting, errors}) => (
            <Form className={styles.inputForm}>
              <ErrorMessage
                className={styles.errorMessage}
                name="email"
                component="div"
              />
              <Field
                placeholder="email"
                type="email"
                name="email"
                className={
                  errors.email === undefined
                    ? styles.inputField
                    : styles.errorField
                }
              />
              <ErrorMessage
                className={styles.errorMessage}
                name="password"
                component="div"
              />
              <Field
                placeholder="пароль"
                type="password"
                name="password"
                className={
                  errors.password === undefined
                    ? styles.inputField
                    : styles.errorField
                }
              />
              <div className={styles.buttons}>
                <Button type="button" onClick={() => setVisibility('block')}>Реєстрація</Button>
                <Button type="submit" disabled={isSubmitting}>
                  Увійти
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
