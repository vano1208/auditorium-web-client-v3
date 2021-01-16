import React from "react";
import styles from "./registration.module.css";
import {isLoggedVar} from "../../../api/client";
import {ErrorMessage, Field, Form, Formik} from "formik";
import Button from "../../button/Button";
import {useMutation, useQuery} from "@apollo/client";
import {SIGN_UP} from "../../../api/operations/mutations/signUp";
import PopupWindow from "../../popupWindow/PopupWindow";
import * as Yup from 'yup';
import {Degree, Department, userTypes} from "../../../models/models";
import {GET_DEGREES} from "../../../api/operations/queries/degrees";
import {GET_DEPARTMENTS} from "../../../api/operations/queries/departments";

type PropTypes = {
  visibility: string;
  onClose: (value: string) => void;
};

const Registration: React.FC<PropTypes> = ({ visibility, onClose }) => {
  const {data: degrees, loading: loadingDegs, error: errorDegs} = useQuery(GET_DEGREES);
  const {data: departments, loading: loadingDeps, error: errorDeps} = useQuery(GET_DEPARTMENTS);
  const fieldsData = [
    {placeholder: "прізвище", name: "lastName", type: "text"},
    {placeholder: "ім'я", name: "firstName", type: "text"},
    {placeholder: "по-батькві", name: "patronymic", type: "text"},
    {placeholder: "email", name: "email", type: "email"},
    {placeholder: "пароль", name: "password", type: "password"},
    {placeholder: "повторіть пароль", name: "passwordConfirm", type: "password"},
    {placeholder: "телефон", name: "phoneNumber", type: "text"},
    {placeholder: "кафедра", name: "department", type: "text"},
    {placeholder: "ступінь", name: "degree", type: "text"},
    {placeholder: "Рік початку навчання", name: "startYear", type: "number"},
  ];
  const [signUp] = useMutation(SIGN_UP);
  const format = "Невірний формат";
  const req = "Обов'язкове поле";
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .max(20, "Не більше 20 символів")
      .required(req),
    lastName: Yup.string()
      .max(20, "Не більше 20 символів")
      .required(req),
    patronymic: Yup.string()
      .max(20, "Не більше 20 символів"),
    email: Yup.string().email(format).required(req),
    department: Yup.string().required(req),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Невірний формат номеру').required(req),
    password: Yup.string().required(req).min(6),
    passwordConfirm: Yup.string().when("password", {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Паролі не співпадають"
      )
    }),
    degree: Yup.string(),
    startYear: Yup.number().min((new Date().getFullYear())-4)
  })
  return <PopupWindow headerBody="Реєстрація" onClose={onClose} visibility={visibility}>
    <Formik
      initialValues={{
        firstName: "",
        patronymic: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
        department: !loadingDeps&&!errorDeps?departments.departments[0].name:"",
        phoneNumber: "",
        degree: !loadingDegs&&!errorDegs?degrees.degrees[0].name:"",
        startYear: new Date().getFullYear()
      }}
      validationSchema={SignupSchema}
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
              department: values.department,
              degree: values.degree,
              startYear: values.startYear,
              type: values.degree==='Бакалавр'||values.degree==='Магістр'?userTypes.STUDENT:userTypes.POST_GRADUATE,
            },
          },
        }).then((r) => {
          sessionStorage.setItem("token", r.data.signup.token);
          sessionStorage.setItem("userId", r.data.signup.user.id);

        });
        setSubmitting(false);
        isLoggedVar(true);
      }}
    >
      {({ isSubmitting, errors , values, handleChange, handleBlur}) => (
        <Form className={styles.inputForm}>
          {fieldsData.map(({placeholder, type, name, })=>
            name==="degree"?<div className={styles[name]}>
              <label htmlFor={name}>{placeholder}: <Field name={name} as="select" value={values.degree} onChange={handleChange} onBlur={handleBlur}>
                {!loadingDegs&&!errorDegs?degrees.degrees.map(({name}:Degree)=><option value={name} label={name}/>):
                  <option value="...">...</option>}
              </Field>
              </label>
            </div>:name==="department"?<div className={styles[name]}>
              <label htmlFor={name}>{placeholder}: <Field name={name} as="select" value={values.department} onChange={handleChange} onBlur={handleBlur}>
                {!loadingDeps&&!errorDeps?departments.departments.map(({name}:Department)=><option value={name} label={name}/>):
                  <option value="...">...</option>}
              </Field></label>
            </div>:<div className={styles[name]}>
              <label htmlFor={name}>{placeholder}: <Field
              placeholder={placeholder}
              type={type}
              name={name}
              // className={
              //   errors.email === undefined
              //     ? styles.inputField
              //     : styles.errorField
              // }
              defaultValue="def"
              /></label>
            <ErrorMessage
              className={styles.errorMessage}
              name={name}
              component="span"
            />
          </div>)}
          <div className={styles.buttons}>
            <Button type="button">Очистити</Button>
            <Button type="submit" disabled={isSubmitting}>
              Зареєструватися
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  </PopupWindow>
};

export default Registration;
