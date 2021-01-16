import React from "react";
import styles from "./gridElement.module.css";
import {
  Classroom,
  InstrumentType,
  userTypeColors,
  userTypes,
  userTypesUa,
} from "../../models/models";
import Instrument from "../instrument/Instrument";
import {useHistory} from "react-router-dom";
import {formatMinutesToMM, getPossiblyOccupied} from "../../helpers/helpers";
import pianoIcon from '../../assets/specialPiano.png';

type PropTypes = {
  classroom: Classroom;
  onClose: (value: string) => void;
};

const GridElement: React.FC<PropTypes> = ({classroom, onClose}) => {
  const {name: classroomName, occupied, schedule} = classroom;
  const occupiedBecauseSchedule: boolean = getPossiblyOccupied(schedule);
  const occupationTime = occupied
    ? new Date(occupied.until).getHours() +
    ":" +
    formatMinutesToMM(new Date(occupied.until).getMinutes())
    : null;
  const history = useHistory();
  const onClick = () => {
    history.push("/auditoriums/" + classroomName);
    onClose("block");
  };
  const fullName =
    occupied?.user.nameTemp === null
      ? [
        occupied?.user.lastName,
        occupied?.user.firstName.charAt(0) + ".",
        occupied?.user.patronymic?.charAt(0) + ".",
      ].join("\u00A0")
      : occupied?.user.nameTemp?.split(" ").join("\u00A0");

  return (
    <div
      onClick={onClick}
      className={styles.cell}
      style={
        occupied
          ? {backgroundColor: "#ffffff"}
          : {backgroundColor: "#63ff97"}
      }
    >
      {classroom.special && <img className={styles.specialIcon} src={pianoIcon} alt="piano"/>}
      <div className={styles.cellHeader}>
        <div
          style={
            occupied
              ? {
                backgroundColor: userTypeColors[occupied.user.type as userTypes],
                color: "#fff",
                border: "none"
              }
              : {
                backgroundColor: "transparent",
                color: "#1e2c4f",
                border: "1px solid rgba(30,44,79, .2)",
              }
          }
          className={styles.cellName}
        >
          {classroomName}
        </div>
        {occupied ? (
          <div className={occupied.user.nameTemp !== null && (fullName as string).length >= 20 ?
            [styles.gradient, styles.occupant].join(" ") :
            styles.occupant}>
            <div>
              <h2 className={occupied.user.nameTemp !== null && (fullName as string).length >= 20 ?
                styles.tickerAnimation : undefined}>{occupied.user.nameTemp !== null && (fullName as string).length >= 20 ?
                [fullName, fullName].join("\u00A0\u00A0\u00A0\u00A0\u00A0") : fullName}</h2>
            </div>

            <div className={styles.occupantType}>
              {userTypesUa[occupied.user.type as userTypes]}
            </div>
          </div>
        ) : null}
      </div>
      <div className={styles.message}>
        {occupied ? (
          <p style={{
            opacity:
              !(occupied?.user.type === userTypes.STUDENT || occupied?.user.type === userTypes.POST_GRADUATE) ? 0 : 1
          }}>
            {(occupied.user.type === userTypes.STUDENT || occupied.user.type === userTypes.POST_GRADUATE) ?
              <>Зайнято до <span>{occupationTime}</span></> : "Зайнято"}
          </p>
        ) : occupiedBecauseSchedule ? <p>Можливі заняття за розкладом</p> : <p>Вільно</p>}
      </div>
      <div className={styles.instruments}>
        {classroom.instruments.map((instrument: InstrumentType) => (
          <Instrument instrument={instrument}/>
        ))}
      </div>
    </div>
  );
};

export default GridElement;
