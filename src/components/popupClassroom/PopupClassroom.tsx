import React from "react";
import {
  Classroom,
  InstrumentType,
  OccupiedInfo,
  ScheduleUnit,
  userTypes,
} from "../../models/models";
import styles from "./popupClassroom.module.css";
import { useParams } from "react-router-dom";
import Tag from "../tag/Tag";
import ClassroomSchedule from "../classroomSchedule/ClassroomSchedule";
import Instrument from "../instrument/Instrument";
import OccupationInfo from "./occupationInfo/OccupationInfo";
import OccupantRegistration from "./occupantRegistration/OccupantRegistration";
import PopupWindow from "../popupWindow/PopupWindow";
import { useQuery } from "@apollo/client";
import { GET_CLASSROOM_BY_NAME } from "../../api/operations/queries/classrooms";
import Loading from "../loading/Loading";
import DisableClassroomButton from "./disableClassroomButton/DisableClassroomButton";

interface PropTypes {
  classrooms: Array<Classroom>;
  visibility: string;
  onClose: (value: string) => void;
  readyForRewriting: boolean;
  setReadyForRewriting: (value: boolean) => void;
  meType: string;
}

interface ParamTypes {
  classroomName: string;
}

const PopupClassroom: React.FC<PropTypes> = ({
  classrooms,
  visibility,
  onClose,
  readyForRewriting,
  setReadyForRewriting,
  meType,
}) => {
  let { classroomName } = useParams<ParamTypes>();
  if (classroomName === undefined) classroomName = "1";
  const { data: fetchedClassroom, loading, error } = useQuery(
    GET_CLASSROOM_BY_NAME,
    {
      variables: {
        name: classroomName,
        date: new Date().toString(),
      },
    }
  );
  const classroom = classrooms.find(
    (classroom) => classroom.name === classroomName
  ) as Classroom;
  const {
    name,
    chair,
    isWing,
    isOperaStudio,
    special,
    schedule,
    instruments,
    occupied,
    disabled,
  } = classroom;

  const assembledSchedule: Array<ScheduleUnit> = schedule.map(
    (scheduleUnit, index) => {
      if (!loading && !error) {
        return {
          ...scheduleUnit,
          user: fetchedClassroom.classroom.schedule[index].user,
          activity: fetchedClassroom.classroom.schedule[index].activity,
        };
      } else return scheduleUnit;
    }
  );
  const assembledInstruments: Array<InstrumentType> = instruments.map(
    (instrument, index) => {
      if (!loading && !error) {
        return {
          ...instrument,
          name: fetchedClassroom.classroom.instruments[index].name,
        };
      } else return instrument;
    }
  );
  const headerBody = (
    <>
      {"Аудиторія №" + name + (chair !== null ? " — " + chair : "")}
      {isWing ? <Tag text="Флігель" /> : null}
      {isOperaStudio ? <Tag text="Оперна студія" /> : null}
      {special ? <Tag text="Спеціалізована (ф-но)" /> : null}
    </>
  );

  return (
    <PopupWindow
      headerBody={headerBody}
      onClose={onClose}
      visibility={visibility}
    >
      {!loading && !error ? (
        <ClassroomSchedule schedule={assembledSchedule} />
      ) : (
        <Loading />
      )}
      <div className={instruments.length !== 0 ? styles.instruments : ""}>
        {!loading && !error ? (
          assembledInstruments.map((instrument) => (
            <Instrument key={instrument.id} withName instrument={instrument} />
          ))
        ) : (
          <Loading />
        )}
      </div>
      {occupied ? (
        readyForRewriting ? (
          <OccupantRegistration classroom={classroom} onClose={onClose} />
        ) : (
          <OccupationInfo
            occupied={occupied as OccupiedInfo}
            classroom={classroom}
            onClose={onClose}
            setReadyForRewriting={(value) => setReadyForRewriting(value)}
            meType={meType}
          />
        )
      ) : meType === userTypes.ADMIN ? (
        <OccupantRegistration classroom={classroom} onClose={onClose} />
      ) : null}
      <DisableClassroomButton classroom={classroom} disabled={disabled} onClose={onClose}/>
    </PopupWindow>
  );
};

export default PopupClassroom;
