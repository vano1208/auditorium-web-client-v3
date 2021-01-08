import React from "react";
import { Classroom } from "../../../models/models";
import styles from "./popupClassroom.module.css";
import { useParams } from "react-router-dom";
import Tag from "../../tag/Tag";
import ClassroomSchedule from "../../classroomSchedule/ClassroomSchedule";
import Instrument from "../../instrument/Instrument";
import OccupationInfo from "./occupationInfo/OccupationInfo";
import OccupantRegistration from "./occupantRegistration/OccupantRegistration";

interface PropTypes {
  classrooms: Array<Classroom>;
  visibility: string;
  onClose: (value: string) => void;
}

interface ParamTypes {
  classroomId: string;
}

const PopupClassroom: React.FC<PropTypes> = ({
  classrooms,
  visibility,
  onClose,
}) => {
  let { classroomId } = useParams<ParamTypes>();
  if (classroomId === undefined) classroomId = "1";
  const popupClassroom = classrooms.find(
    (classroom) => classroom.name === classroomId
  ) as Classroom;
  return (
    <div
      style={{ display: visibility }}
      className={styles.modal}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose("none");
        }
      }}
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <span onClick={() => onClose("none")} className={styles.close}>
            &times;
          </span>
          <h2>
            {"Аудиторія №" +
              popupClassroom.name +
              (popupClassroom.chair !== null
                ? " — " + popupClassroom.chair
                : "")}
            {popupClassroom.isWing ? <Tag text="Флігель" /> : null}
            {popupClassroom.special ? (
              <Tag text="Спеціалізована (ф-но)" />
            ) : null}
          </h2>
        </div>
        <div className={styles.modalBody}>
          <ClassroomSchedule schedule={popupClassroom.schedule} />
          <div
            className={
              popupClassroom.instruments.length !== 0 ? styles.instruments : ""
            }
          >
            {popupClassroom.instruments.map((instrument) => (
              <Instrument
                key={instrument.id}
                withName
                instrument={instrument}
              />
            ))}
          </div>
          {popupClassroom.occupied ? (
            <OccupationInfo
              occupied={popupClassroom.occupied}
              classroom={popupClassroom}
              onClose={onClose}
            />
          ) : (
            <OccupantRegistration
              classroom={popupClassroom}
              onClose={onClose}
            />
          )}
        </div>
        {/*<div className={styles.modalFooter}>*/}
        {/*  <Button>Заблокувати аудиторію</Button>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default PopupClassroom;
