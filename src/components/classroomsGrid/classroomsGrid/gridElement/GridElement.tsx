import React from "react";
import styles from "./gridElement.module.css";
import {
  Classroom,
  InstrumentType,
  userTypeColors,
  userTypes,
  userTypesUa,
} from "../../../../models/models";
import Instrument from "../../../instrument/Instrument";
import { useHistory } from "react-router-dom";
import {getPossiblyOccupied} from "../../../../helpers/helpers";
import pianoIcon from './../../../../assets/specialPiano.png';

type PropTypes = {
  classroom: Classroom;
  onClose: (value: string) => void;
};

const GridElement: React.FC<PropTypes> = ({ classroom, onClose }) => {
  const { name: classroomName, occupied, schedule} = classroom;
  const occupiedBecauseSchedule:boolean = getPossiblyOccupied(schedule);
  const occupationTime = occupied
    ? new Date(occupied.until).getHours() +
      ":" +
      new Date(occupied.until).getMinutes()
    : null;
  const history = useHistory();
  const onClick = () => {
    history.push("/auditoriums/" + classroomName);
    onClose("block");
  };
  const tempName = (str: string) => {
    if(str!==undefined) {
    let array = str.split(" ");
    let name1 = array[1]?.charAt(0) + ".";
    let name2 = array[2] ? array[2].charAt(0) + "." : "";
    return [array[0], name1, name2].join(" ");
    } else return ""
  };
  const fullName =
    occupied?.user.nameTemp === null
      ? [
          occupied?.user.lastName,
          occupied?.user.firstName.charAt(0) + ".",
          occupied?.user.patronymic?.charAt(0) + ".",
        ].join(" ")
      : tempName(occupied?.user.nameTemp as string);
  return (
    <div
      onClick={onClick}
      className={styles.cell}
      style={
        occupied
          ? { backgroundColor: "#ffffff" }
          : { backgroundColor: "#63ff97" }
      }
    >
      {classroom.special&&<img className={styles.specialIcon} src={pianoIcon} alt="piano"/>}
      <div className={styles.cellHeader}>
        <div
          style={
            occupied
              ? {
                  backgroundColor:
                    userTypeColors[occupied.user.type as userTypes],
                }
              : {
                  backgroundColor: "none",
                  color: "#1e2c4f",
                  border: "1px solid rgba(30,44,79, .2)",
                }
          }
          className={styles.cellName}
        >
          {classroomName}
        </div>
        {occupied ? (
          <div className={styles.occupant}>
            <div>
              <h2>{fullName}</h2>
            </div>

            <div className={styles.occupantType}>
              {userTypesUa[occupied.user.type as userTypes]}
            </div>
          </div>
        ) : null}
      </div>
      <div className={styles.message} style={{opacity:
          !(occupied?.user.type === userTypes.STUDENT || occupied?.user.type===userTypes.POST_GRADUATE)?0:1}}>
        {occupied ? (
          <p>
            {(occupied.user.type === userTypes.STUDENT || occupied.user.type===userTypes.POST_GRADUATE)?
              <>Зайнято до  <span>{occupationTime}</span></>:"Зайнято"}
          </p>
        ) : occupiedBecauseSchedule?<p>Можливі заняття за розкладом</p>:<p>Вільно</p>}
      </div>
      <div className={styles.instruments}>
        {classroom.instruments.map((instrument: InstrumentType) => (
          <Instrument instrument={instrument} />
        ))}
      </div>
    </div>
  );
};

export default GridElement;
