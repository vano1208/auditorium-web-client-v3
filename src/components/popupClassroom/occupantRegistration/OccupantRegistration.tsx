import React, { useEffect, useState } from "react";
import styles from "./occupantRegistration.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USERS } from "../../../api/operations/queries/users";
import {
  Classroom,
  User,
  userTypes,
  userTypesUa,
} from "../../../models/models";
import { OCCUPY_CLASSROOM } from "../../../api/operations/mutations/occupyClassroom";
import Button from "../../button/Button";
import { MINUTE } from "../../../helpers/constants";
import Loading from "../../loading/Loading";
import { gridUpdate } from "../../../api/client";

type PropTypes = {
  classroom: Classroom;
  onClose: (value: string) => void;
};

const OccupantRegistration: React.FC<PropTypes> = ({ classroom, onClose }) => {
  let textInput: HTMLElement | null = null;
  useEffect(() => {
    textInput && (textInput as HTMLElement).focus();
  });
  useEffect(()=>{
    return () => {
      setValidationText("");
      setValue("");
      setRangeValue(4);
      setChosenOccupantInfo("");
      setTempUserType("STUDENT");
    }
  },[onClose])
  const [validationText, setValidationText] = useState("");
  const { loading, data, error } = useQuery(GET_USERS);
  const [value, setValue] = useState("");
  const [rangeValue, setRangeValue] = useState(4);
  const [occupyClassroom] = useMutation(OCCUPY_CLASSROOM);
  let [chosenOccupantInfo, setChosenOccupantInfo] = useState("");
  let [tempUserType, setTempUserType] = useState("STUDENT");
  if (loading) return <Loading />;
  if (error) return <h1>Error</h1>;
  let users = data.users;
  const timeline = [
    "15 хв.",
    "30 хв.",
    "45 хв.",
    "1год.",
    "1 год. 15 хв.",
    "1 год. 30 хв.",
    "1 год. 45 хв.",
    "2 год.",
    "2 год. 15 хв.",
    "2 год. 30 хв.",
    "2 год. 45 хв.",
    "3 год.",
  ];
  const handleChange = (e: any) => {
    setValidationText("");
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
            value === ""
              ? setValidationText("Введіть ID або П.І.Б.")
              : // : users.find((user: UserPopup) => user.id === value)!==(-1)?""
                occupyClassroom({
                  variables: {
                    input: {
                      classroomName: String(classroom.name),
                      userId: value.match(/^\d+$/) ? Number(value) : -1,
                      until: new Date(
                        new Date().getTime() + rangeValue * 15 * MINUTE
                      ),
                      tempUser: value.match(/^\d+$/)
                        ? null
                        : {
                            name: value,
                            type: tempUserType,
                          },
                    },
                  },
                  update(cache, { data }) {
                    cache.modify({
                      fields: {
                        classrooms(existingRelay, { toReference }) {
                          const freedClassroomIndex = existingRelay.findIndex(
                            (el: Classroom) =>
                              el.id === data.occupyClassroom.classroom.id
                          );

                          return existingRelay
                            .slice()
                            .splice(
                              freedClassroomIndex,
                              1,
                              data.occupyClassroom.classroom
                            );
                        },
                      },
                    });
                  },
                }).then(() => {
                  gridUpdate(!gridUpdate());
                  onClose("none");
                });
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
                innerRef={(input: any) => {
                  textInput = input;
                }}
              />
              {/*<input*/}
              {/*  type="text"*/}
              {/*  ref={(input: any) => {*/}
              {/*    textInput = input;*/}
              {/*  }}*/}
              {/*/>*/}
              <label htmlFor="users"> {validationText}</label>
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
                  ? ""
                  : chosenOccupantInfo.match(/^\d+$/) &&
                    users.find((user: User) => user.id === Number(value)) !==
                      undefined
                  ? [
                      users.find((user: User) => user.id === Number(value))
                        .lastName,
                      users.find((user: User) => user.id === Number(value))
                        .firstName,
                      users.find((user: User) => user.id === Number(value))
                        .patronymic,
                    ].join(" ")
                  : chosenOccupantInfo}
              </p>
              <p style={{ color: "#959595" }} className={styles.status}>
                Статус:&nbsp;
              </p>
              {chosenOccupantInfo === "" ? (
                ""
              ) : chosenOccupantInfo.match(/^\d+$/) &&
                users.find((user: User) => user.id === Number(value)) !==
                  undefined ? (
                userTypesUa[
                  users.find((user: User) => user.id === Number(value))
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
                  <option value={userTypes.STAFF}>Співробітник</option>
                  <option value={userTypes.PIANO_TUNER}>
                    Настроювач фортепіано
                  </option>
                  <option value={userTypes.OTHER}>Інше</option>
                </select>
              )}
              <br />
              {users.find((user: User) => user.id === Number(value))?.type ===
                userTypes.STUDENT ||
              users.find((user: User) => user.id === Number(value))?.type ===
                userTypes.POST_GRADUATE ||
              (!chosenOccupantInfo.match(/^\d+$/) &&
                chosenOccupantInfo !== "" &&
                (tempUserType === userTypes.STUDENT ||
                  tempUserType === userTypes.POST_GRADUATE)) ? (
                <>
                  <Field
                    className={styles.untilInput}
                    id="untilRange"
                    type="range"
                    min="1"
                    max="12"
                    step="1"
                    value={rangeValue}
                    onChange={(e: any) => setRangeValue(e.target.value)}
                  />
                  <label htmlFor="untilRange">
                    {" до "}
                    {new Date(
                      new Date().getTime() + rangeValue * 15 * MINUTE
                    ).getHours() +
                      ":" +
                      new Date(
                        new Date().getTime() + rangeValue * 15 * MINUTE
                      ).getMinutes() +
                      " (" +
                      timeline[rangeValue - 1] +
                      ")"}
                  </label>
                </>
              ) : null}

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
