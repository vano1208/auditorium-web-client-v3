import React, {useState} from "react";
import {Classroom, OccupiedInfo} from "../../models/models";
import styles from "./popupClassroom.module.css";
import {useParams} from "react-router-dom";
import Tag from "../tag/Tag";
import ClassroomSchedule from "../classroomSchedule/ClassroomSchedule";
import Instrument from "../instrument/Instrument";
import OccupationInfo from "./occupationInfo/OccupationInfo";
import OccupantRegistration from "./occupantRegistration/OccupantRegistration";
import PopupWindow from "../popupWindow/PopupWindow";
import {useQuery} from "@apollo/client";
import {GET_USERS} from "../../api/operations/queries/users";

interface PropTypes {
  classrooms: Array<Classroom>;
  visibility: string;
  onClose: (value: string) => void;
  readyForRewriting: boolean;
  setReadyForRewriting: (value: boolean) => void;
}

interface ParamTypes {
  classroomId: string;
}

const PopupClassroom: React.FC<PropTypes> = (
  {
    classrooms,
    visibility,
    onClose,
    readyForRewriting,
    setReadyForRewriting
  }) => {
  let {classroomId} = useParams<ParamTypes>();
  if (classroomId === undefined) classroomId = "1";
  const classroom = classrooms.find(
    (classroom) => classroom.name === classroomId
  ) as Classroom;
  const {name, chair, isWing, isOperaStudio, special, schedule, instruments, occupied} = classroom;
  const headerBody = <>
    {"Аудиторія №" +
    name +
    (chair !== null
      ? " — " + chair
      : "")}
    {isWing ? <Tag text="Флігель"/> : null}
    {isOperaStudio ? <Tag text="Оперна студія"/> : null}
    {special ? <Tag text="Спеціалізована (ф-но)"/> : null}
  </>

  return <PopupWindow headerBody={headerBody} onClose={onClose} visibility={visibility}>
    <ClassroomSchedule schedule={schedule}/>
    <div
      className={
        instruments.length !== 0 ? styles.instruments : ""
      }
    >
      {instruments.map((instrument) => (
        <Instrument
          key={instrument.id}
          withName
          instrument={instrument}
        />
      ))}
    </div>
    {occupied ? readyForRewriting ? <OccupantRegistration
      classroom={classroom}
      onClose={onClose}
    /> : (
      <OccupationInfo
        occupied={occupied as OccupiedInfo}
        classroom={classroom}
        onClose={onClose}
        setReadyForRewriting={(value) => setReadyForRewriting(value)}
      />
    ) : (
      <OccupantRegistration
        classroom={classroom}
        onClose={onClose}
      />
    )}
  </PopupWindow>
};

export default PopupClassroom;
