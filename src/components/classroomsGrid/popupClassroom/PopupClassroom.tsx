import React, {useState} from "react";
import {Classroom, OccupiedInfo} from "../../../models/models";
import styles from "./popupClassroom.module.css";
import {useParams} from "react-router-dom";
import Tag from "../../tag/Tag";
import ClassroomSchedule from "../../classroomSchedule/ClassroomSchedule";
import Instrument from "../../instrument/Instrument";
import OccupationInfo from "./occupationInfo/OccupationInfo";
import OccupantRegistration from "./occupantRegistration/OccupantRegistration";

interface PropTypes {
  classrooms: Array<Classroom>;
  visibility: string;
  onClose: (value: string) => void;
  readyForRewriting: boolean;
  setReadyForRewriting: (value:boolean) => void;
}

interface ParamTypes {
  classroomId: string;
}

const PopupClassroom: React.FC<PropTypes> = ({
                                               classrooms,
                                               visibility,
                                               onClose,
                                               readyForRewriting,
                                               setReadyForRewriting
                                             }) => {
  let {classroomId} = useParams<ParamTypes>();

  if (classroomId === undefined) classroomId = "1";
  const popupClassroom = classrooms.find(
    (classroom) => classroom.name === classroomId
  ) as Classroom;
  return (
    <div
      style={{display: visibility}}
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
            {popupClassroom.isWing ? <Tag text="Флігель"/> : null}
            {popupClassroom.isOperaStudio ? <Tag text="Оперна студія"/> : null}
            {popupClassroom.special ? <Tag text="Спеціалізована (ф-но)"/> : null}
          </h2>
        </div>
        <div className={styles.modalBody}>
          <ClassroomSchedule schedule={popupClassroom.schedule}/>
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
          {popupClassroom.occupied? readyForRewriting? <OccupantRegistration
            classroom={popupClassroom}
            onClose={onClose}
          />: (
            <OccupationInfo
              occupied={popupClassroom.occupied as OccupiedInfo}
              classroom={popupClassroom}
              onClose={onClose}
              setReadyForRewriting={(value)=>setReadyForRewriting(value)}
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
