import React, { useState } from "react";
import styles from "./occupantRegistration.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { GET_USERS } from "../../../../api/operations/queries/users";
import {
  Classroom,
  User,
  userTypes,
  userTypesUa,
} from "../../../../models/models";
import { OCCUPY_CLASSROOM } from "../../../../api/operations/mutations/occupyClassroom";
import { GET_CLASSROOMS } from "../../../../api/operations/queries/classrooms";
import Button from "../../../button/Button";

type PropTypes = {
  classroom: Classroom;
};

const OccupantRegistration: React.FC<PropTypes> = ({ classroom }) => {
  const { loading, data, error } = useQuery(GET_USERS);
  const [value, setValue] = useState("");
  const [rangeValue, setRangeValue] = useState(1);
  const [occupyClassroom] = useMutation(OCCUPY_CLASSROOM);
  const [getClassrooms] = useLazyQuery(GET_CLASSROOMS, {
    variables: {
      date: new Date().toString(),
    },
  });
  let [chosenOccupantInfo, setChosenOccupantInfo] = useState("");
  let [tempUserType, setTempUserType] = useState("STUDENT");
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;
  let users = data.users;
  const handleChange = (e: any) => {
    setValue(e.target.value);
    users = users
      .slice()
      .filter((user: User) =>
        [user.id, user.lastName, user.firstName, user.patronymic]
          .join("")
          .indexOf(e.target.value)
      );
    setChosenOccupantInfo(e.target.value);
  };
  return (
    <div className={styles.occupantRegistration}>
      <div className={styles.chosenOccupantInfo}>
        <p className={styles.inputFieldAbout}>
          Шукайте по ID або П.І.Б. серед існуючих користувачів або введіть
          П.І.Б. незареєстрованого користувача:
        </p>
        <Formik
          initialValues={{ users: value }}
          onSubmit={(values, { setSubmitting }) => {
            occupyClassroom({
              variables: {
                input: {
                  classroomName: String(classroom.name),
                  userId: value.match(/^\d+$/) ? Number(value) : -1,
                  until: new Date(),
                  tempUser: value.match(/^\d+$/)
                    ? null
                    : {
                        name: value,
                        type: tempUserType,
                      },
                },
              },
            }).then((r) => getClassrooms());
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                className={styles.inputField}
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="Прізвище або ID"
                name="users"
                list="usersList"
                id="users"
              />
              <datalist id="usersList">
                {!loading
                  ? users.map((user: User) => (
                      <option value={user.id} key={user.id}>
                        {[user.lastName, user.firstName, user.patronymic].join(
                          " "
                        )}
                      </option>
                    ))
                  : null}
              </datalist>
              <ErrorMessage name="users" component="div" />
              <p>
                <span style={{ color: "#959595" }}>П.І.Б.:&nbsp;</span>
                {chosenOccupantInfo === ""
                  ? "не визначено"
                  : chosenOccupantInfo.match(/^\d+$/)
                  ? [
                      users.find((user: User) => user.id === value).lastName,
                      users.find((user: User) => user.id === value).firstName,
                      users.find((user: User) => user.id === value).patronymic,
                    ].join(" ")
                  : chosenOccupantInfo}
              </p>
              <p style={{ color: "#959595" }} className={styles.status}>
                Статус:&nbsp;
              </p>
              {chosenOccupantInfo === "" ? (
                "не визначено"
              ) : chosenOccupantInfo.match(/^\d+$/) ? (
                userTypesUa[
                  users.find((user: User) => user.id === value)
                    .type as userTypes
                ]
              ) : (
                <select
                  name="userTempType"
                  id="userTempType"
                  onChange={(e) => {
                    setTempUserType(e.target.value);
                  }}
                  defaultValue="STUDENT"
                >
                  <option value={userTypes.STUDENT}>Студент</option>
                  <option value={userTypes.TEACHER}>Викладач</option>
                  <option value={userTypes.POST_GRADUATE}>
                    Асистент/Аспірант
                  </option>
                  <option value={userTypes.CONCERTMASTER}>
                    Концертмейстер
                  </option>
                  <option value={userTypes.ILLUSTRATOR}>Іллюстратор</option>
                  <option value={userTypes.ADMINISTRATION}>
                    Адміністрація
                  </option>
                  <option value={userTypes.OTHER}>Інше</option>
                </select>
              )}
              <br />
              <Field
                className={styles.untilInput}
                type="range"
                min="0"
                max="3"
                step="1"
                value={rangeValue}
                onChange={(e: any) => setRangeValue(e.target.value)}
              />
              <div className={styles.buttonWrapper}>
                <Button type="submit" disabled={isSubmitting}>
                  Записати в аудиторію
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default OccupantRegistration;
