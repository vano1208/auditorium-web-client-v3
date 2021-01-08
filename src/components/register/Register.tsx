import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_REGISTER } from "../../api/operations/queries/register";
import { RegisterUnit } from "../../models/models";
import styles from "./register.module.css";
import html2canvas from "html2canvas";
import Button from "../button/Button";
import { jsPDF } from "jspdf";
import RegisterSkeleton from "./RegisterSkeleton";

const Register = () => {
  const [registerDate, setRegisterDate] = useState(new Date());
  const { loading, error, data } = useQuery(GET_REGISTER, {
    fetchPolicy: "network-only",
    variables: {
      date: new Date(registerDate).setHours(0, 0, 0, 0),
    },
  });
  return (
    <div className={styles.register}>
      <div className={styles.registerHeader}>
        Журнал
        <input className={styles.registerDateInput}
          type="date"
          onChange={(e) => setRegisterDate(new Date(e.target.value))}
        />
      </div>
      {loading || error ? (
        <RegisterSkeleton />
      ) : (
        <ul id="register">
          <li
            className={[styles.registerUnitList, styles.listHeader].join(" ")}
          >
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
      )}
      <Button
        onClick={() => {
          html2canvas(document.querySelector("#register") as HTMLElement).then(
            (canvas) => {
              const imgData = canvas.toDataURL("image/png");
              const pdf = new jsPDF();
              pdf.addImage(
                imgData,
                "PNG",
                -40,
                10,
                290,
                13 * data.register.length
              );
              pdf.save("register.pdf");
            }
          );
        }}
      >
        Зберегти в PDF
      </Button>
    </div>
  );
};

export default Register;
