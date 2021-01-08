import React from "react";
import styles from "./registration.module.css";
import { isLoggedVar } from "../../../api/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Button from "../../button/Button";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../../../api/operations/mutations/signUp";

type PropTypes = {
  visibility: string;
  onClose: (value: string) => void;
};

const Registration: React.FC<PropTypes> = ({ visibility, onClose }) => {
  const [signUp] = useMutation(SIGN_UP);
  return (
    <div style={{ display: visibility }} className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <span onClick={() => onClose("none")} className={styles.close}>
            &times;
          </span>
          <h2>Реєстрація</h2>
        </div>
        <div className={styles.modalBody}>
          <Formik
            initialValues={{
              firstName: "",
              patronymic: "",
              lastName: "",
              type: "STUDENT",
              email: "",
              password: "",
              repeatPassword: "",
              department: "",
              phoneNumber: "",
            }}
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
              if (!values.lastName) {
                // @ts-ignore
                errors.lastName = "Обов'язкове поле";
              }
              if (!values.firstName) {
                // @ts-ignore
                errors.firstName = "Обов'язкове поле";
              }
              if (!values.patronymic) {
                // @ts-ignore
                errors.patronymic = "Обов'язкове поле";
              }
              if (!values.phoneNumber) {
                // @ts-ignore
                errors.phoneNumber = "Обов'язкове поле";
              } else if (!/[0-9]/.test(values.phoneNumber)) {
                // @ts-ignore
                errors.phoneNumber = "Невірний формат";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              signUp({
                variables: {
                  input: {
                    email: values.email,
                    phoneNumber: values.phoneNumber,
                    extraPhoneNumbers: "",
                    password: values.password,
                    firstName: values.firstName,
                    patronymic: values.patronymic,
                    lastName: values.lastName,
                    type: values.type,
                    department: values.department,
                  },
                },
              }).then((r) => {
                localStorage.setItem("token", r.data.signup.token);
                localStorage.setItem("userId", r.data.signup.user.id);
              });
              setSubmitting(false);
              isLoggedVar(true);
            }}
          >
            {({ isSubmitting, errors }) => (
              <Form className={styles.inputForm}>
                <div>
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
                    name="email"
                    component="span"
                  />
                </div>
                <div>
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
                  <ErrorMessage
                    className={styles.errorMessage}
                    name="password"
                    component="span"
                  />
                </div>
                <div>
                  <Field
                    placeholder="повторіть пароль"
                    type="repeatPassword"
                    name="repeatPassword"
                    className={
                      errors.password === undefined
                        ? styles.inputField
                        : styles.errorField
                    }
                  />
                  <ErrorMessage
                    className={styles.errorMessage}
                    name="repeatPassword"
                    component="span"
                  />
                </div>
                <div>
                  <Field
                    placeholder="прізвище"
                    type="lastName"
                    name="lastName"
                    className={
                      errors.password === undefined
                        ? styles.inputField
                        : styles.errorField
                    }
                  />
                  <ErrorMessage
                    className={styles.errorMessage}
                    name="lastName"
                    component="span"
                  />
                </div>
                <div>
                  <Field
                    placeholder="ім'я"
                    type="firstName"
                    name="firstName"
                    className={
                      errors.password === undefined
                        ? styles.inputField
                        : styles.errorField
                    }
                  />
                  <ErrorMessage
                    className={styles.errorMessage}
                    name="firstName"
                    component="span"
                  />
                </div>
                <div>
                  <Field
                    placeholder="по-батькові"
                    type="patronymic"
                    name="patronymic"
                    className={
                      errors.password === undefined
                        ? styles.inputField
                        : styles.errorField
                    }
                  />
                  <ErrorMessage
                    className={styles.errorMessage}
                    name="patronymic"
                    component="span"
                  />
                </div>
                <div>
                  <Field
                    placeholder="телефон"
                    type="phoneNumber"
                    name="phoneNumber"
                    className={
                      errors.password === undefined
                        ? styles.inputField
                        : styles.errorField
                    }
                  />
                  <ErrorMessage
                    className={styles.errorMessage}
                    name="phoneNumber"
                    component="span"
                  />
                </div>
                <div>
                  <Field
                    placeholder="статус"
                    type="type"
                    name="type"
                    className={
                      errors.password === undefined
                        ? styles.inputField
                        : styles.errorField
                    }
                  />
                  <ErrorMessage
                    className={styles.errorMessage}
                    name="type"
                    component="span"
                  />
                </div>
                <div>
                  <Field
                    placeholder="кафедра"
                    type="department"
                    name="department"
                    className={
                      errors.password === undefined
                        ? styles.inputField
                        : styles.errorField
                    }
                  />
                  <ErrorMessage
                    className={styles.errorMessage}
                    name="department"
                    component="span"
                  />
                </div>
                <div className={styles.buttons}>
                  <Button type="button">Очистити</Button>
                  <Button type="submit" disabled={isSubmitting}>
                    Зареєструватися
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Registration;
