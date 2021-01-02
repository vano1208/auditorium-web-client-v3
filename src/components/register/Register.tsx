import React from "react";
import { useQuery } from "@apollo/client";
import { GET_REGISTER } from "../../api/operations/queries/register";
import { RegisterUnit } from "../../models/models";
import styles from "./register.module.css";

const Register = () => {
  const { loading, error, data } = useQuery(GET_REGISTER, {
    fetchPolicy: "network-only",
    variables: {
      date: new Date("12.08.2020").setHours(0, 0, 0, 0),
    },
  });
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;
  return (
    <div className={styles.register}>
      <div className={styles.registerHeader}>Журнал</div>
      <ul>
        <li className={[styles.registerUnitList, styles.listHeader].join(" ")}>
          <div>Аудиторія</div>
          <div>П.І.Б.</div>
          <div>Від</div>
          <div>До</div>
        </li>
        {data.register.map((registerUnit: RegisterUnit) => (
          <li key={registerUnit.id} className={styles.registerUnitList}>
            <div>{registerUnit.classroom.name}</div>
            <div>
              {registerUnit.nameTemp === null
                ? [
                    registerUnit.user.lastName,
                    registerUnit.user.firstName,
                    registerUnit.user.patronymic,
                  ].join(" ")
                : registerUnit.nameTemp}
            </div>
            <div>
              {new Date(registerUnit.start).getHours() +
                ":" +
                new Date(registerUnit.start).getMinutes()}
            </div>
            <div>
              {new Date(registerUnit.end).getHours() +
                ":" +
                new Date(registerUnit.end).getMinutes()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Register;
