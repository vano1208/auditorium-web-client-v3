import React, {useState} from "react";
import {useQuery} from "@apollo/client";
import {GET_REGISTER} from "../../api/operations/queries/register";
import {RegisterUnit, User} from "../../models/models";
import styles from "./register.module.css";
import Button from "../../components/button/Button";
import RegisterSkeleton from "./RegisterSkeleton";
import {NavLink} from "react-router-dom";
import UserPopup from "../../components/user/UserPopup";
import PageHeader from "../../components/pageHeader/PageHeader";
// @ts-ignore
import pdfMake from 'pdfmake/build/pdfmake';
// @ts-ignore
import vfsFonts from 'pdfmake/build/vfs_fonts'

const Register: React.FC = () => {
  const [registerDate, setRegisterDate] = useState(new Date());
  const [registerUser, setRegisterUser] = useState({
    id: 0,
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
  const [visibility, setVisibility] = useState("none");
  const {loading, error, data} = useQuery(GET_REGISTER, {
    variables: {
      date: new Date(registerDate).setHours(0, 0, 0, 0),
    }, fetchPolicy: "network-only"
  });
  const toDateInputValue = (date: Date) => {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toJSON().slice(0, 10);
  };
  const {vfs} = vfsFonts.pdfMake;
  pdfMake.vfs = vfs;
  const registerData = !loading && !error?data.register.map((unit: RegisterUnit)=> {
    const start = new Date(unit.start).getHours() + ":" + new Date(unit.start).getMinutes();
    const end = unit.end !== null ? new Date(unit.end).getHours() +
      ":" + new Date(unit.end).getMinutes() : "—";
    return [
      {text: unit.classroom.name, alignment: 'center'},
      {
        text: unit.nameTemp === null ?
          [unit.user.lastName, unit.user.firstName, unit.user.patronymic].join(" ") : unit.nameTemp
      },
      {text:start, alignment: 'center'},
      {text: end, alignment: 'center'}
    ]
  }):[];
  const documentDefinition = {
    pageSize: 'A4',
    pageOrientation: 'portrait',
    content: [
      {
        table: {
          widths: [30, '*', 50, 50],
          headerRows: 1,
          dontBreakRows: true,
          body: [
            [{text: `Журнал відвідувань за ${[
                registerDate.getDate(),
                registerDate.getMonth() + 1,
                registerDate.getFullYear()].join(".")}`,
              style: 'header',
              colSpan: 4,
              alignment: 'center',
              margin: [0, 10, 0, 10]
            }, {}, {}, {}],
            [
              {text: 'Ауд.', style: 'tableHeader', alignment: 'center'},
              {text: 'П.І.Б.', style: 'tableHeader'},
              {text: 'Від', style: 'tableHeader', alignment: 'center'},
              {text: 'До', style: 'tableHeader', alignment: 'center'},
            ],
            ...registerData,
            [{text: "П.І.Б. ___________________ Підпис ____________________",
              alignment: "center",
              margin: [0, 10, 0, 10],
              colSpan: 4},{}, {}, {}
            ]
          ]
        }
      }
    ],
    styles: {
      tableHeader: {
        bold: true,
      },
      header: {
        fontSize: 18,
        bold: true,
      },
      subheader: {
        fontSize: 15,
        bold: true
      },
      quote: {
        italics: true
      },
      small: {
        fontSize: 8
      }
    }
  };

  return (
    <>
      <UserPopup onClose={() => setVisibility("none")} visibility={visibility} userData={registerUser}/>
      <PageHeader body="Журнал">
        <input className={styles.registerDateInput}
               type="date"
               onChange={(e) => setRegisterDate(new Date(e.target.value))}
               defaultValue={toDateInputValue(new Date())}
        />
        <div className={styles.registerControlPanel}>
          <Button
            onClick={() => {
              pdfMake.createPdf(documentDefinition).print()
            }
            }
          >
            Роздрукувати
          </Button>
          <Button
          onClick={() => {
            pdfMake.createPdf(documentDefinition).download(`register_${[
              registerDate.getDate(),
              registerDate.getMonth() + 1,
              registerDate.getFullYear()].join(".")}.pdf`);
          }
          }
        >
          Зберегти в PDF
        </Button>
        </div>
      </PageHeader>
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
                  {registerUnit.nameTemp === null ? <NavLink
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
                    : registerUnit.nameTemp}</NavLink> : registerUnit.nameTemp === null
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
    </>
  );
};

export default Register;
