import React, {useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_REGISTER} from "../../api/operations/queries/register";
import {RegisterUnit, User} from "../../models/models";
import styles from "./register.module.css";
import html2canvas from "html2canvas";
import Button from "../button/Button";
import {jsPDF} from "jspdf";
import RegisterSkeleton from "./RegisterSkeleton";
import {NavLink, useParams} from "react-router-dom";
import UserPopup from "../user/UserPopup";

interface Params {
  userId: string
}

const Register: React.FC = () => {
  const [registerDate, setRegisterDate] = useState(new Date());
  const [registerUser, setRegisterUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    patronymic: "",
    department: "",
    type: "",
    email: "",
    phoneNumber: "",
    extraPhoneNumbers: "",
    nameTemp: ""
  } as User);
  const [userSearch, setUserSearch] = useState("");
  const {userId} = useParams<Params>();
  const [visibility, setVisibility] = useState("none");
  const {loading, error, data} = useQuery(GET_REGISTER, {
    fetchPolicy: "network-only",
    variables: {
      date: new Date(registerDate).setHours(0, 0, 0, 0),
    },
  });
  const toDateInputValue = (date: Date) => {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toJSON().slice(0, 10);
  };

  return (
    <div className={styles.register}>
      <UserPopup onClose={() => setVisibility("none")} visibility={visibility} userData={registerUser}/>
      <div className={styles.registerHeader}>
        Журнал
        <input className={styles.registerDateInput}
               type="date"
               onChange={(e) => setRegisterDate(new Date(e.target.value))}
               defaultValue={toDateInputValue(new Date())}
        />
        <div className={styles.registerControlPanel}><Button
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
                pdf.save(`register_${[
                  registerDate.getDate(), 
                  registerDate.getMonth()+1, 
                  registerDate.getFullYear()].join("_")}.pdf`);
              }
            );
          }}
        >
          Зберегти в PDF
        </Button>
        </div>
      </div>
      {loading || error ? (
        <RegisterSkeleton/>
      ) : (
        <ul id="register">
          <li
            className={[styles.registerUnitList, styles.listHeader].join(" ")}
          >
            <div>Аудиторія</div>
            <div>П.І.Б. {<input
              className={styles.userSearch}
              type="text"
              placeholder="Пошук (П.І.Б. або ауд.)"
              value={userSearch}
              onChange={(e) => {
                setUserSearch(e.target.value);
              }}
            />}</div>
            <div>Від</div>
            <div>До</div>
          </li>
          {data.register.length === 0 ? <li className={styles.noItemsInfo}>
            {"Записи в журналі за " +
            [registerDate.getDate(), registerDate.getMonth() + 1, registerDate.getFullYear()].join(".") +
            " відсутні!"}
            </li>
            : data.register.filter((registerUnit: RegisterUnit) => {
              return registerUnit.nameTemp === null
                ? [
                registerUnit.user.lastName,
                registerUnit.user.firstName,
                registerUnit.user.patronymic,
                registerUnit.classroom.name].join(" ").indexOf(userSearch) !== -1
                : [registerUnit.nameTemp, registerUnit.classroom.name].join(" ").indexOf(userSearch) !== -1
            }).map((registerUnit: RegisterUnit) => (
              <li key={registerUnit.id} className={styles.registerUnitList}>
                <div>{registerUnit.classroom.name}</div>
                <div>
                  {registerUnit.nameTemp === null?<NavLink
                    className={styles.userLink}
                    onClick={() => {
                    setRegisterUser(registerUnit.user as User);
                    setVisibility("block");
                  }}
                           to={"/register/" + registerUnit.user.id}>{registerUnit.nameTemp === null
                    ? [
                      registerUnit.user.lastName,
                      registerUnit.user.firstName,
                      registerUnit.user.patronymic,
                    ].join(" ")
                    : registerUnit.nameTemp}</NavLink>:registerUnit.nameTemp === null
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
                  {registerUnit.end !== null ? new Date(registerUnit.end).getHours() +
                    ":" +
                    new Date(registerUnit.end).getMinutes() : "—"}
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Register;
