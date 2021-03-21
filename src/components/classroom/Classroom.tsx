import React from "react";
import styles from "./classroom.module.css";
import {
  ClassroomType,
  OccupiedInfo,
  userTypes,
  userTypesUa,
} from "../../models/models";
import { fullName, typeStyle } from "../../helpers/helpers";
import Instruments from "../instruments/Instruments";
import { usePopupWindow } from "../popupWindow/PopupWindowProvider";
import ClassroomInfo from "../ aboutClassroom/ClassroomInfo";
import Tag from "../tag/Tag";
import Footer from "../footer/Footer";

interface PropTypes {
  classroom: ClassroomType;
  dispatchNotification: (value: any) => void;
}

const Classroom: React.FC<PropTypes> = ({
  classroom,
  dispatchNotification,
}) => {
  const { id, name, occupied, instruments, isWing, isOperaStudio } = classroom;
  const occupiedStyle = {
    background: "#fff",
    transition: "all 3s cubic-bezier(0.25, 0.8, 0.25, 1)"
  };
  const vacantStyle = {
    background: "#4bfd63",
    transition: "all 3s cubic-bezier(0.25, 0.8, 0.25, 1)"
  };
  const occupationInfo = occupied ? "Зайнято" : "Вільно";
  const header = (
    <>
      <h1>{`Аудиторія ${name}`}</h1>
      {isWing && <Tag body="Флігель" />}
      {isOperaStudio && <Tag body="Оперна студія" />}
    </>
  );
  const dispatchPopupWindow = usePopupWindow();
  const handleClick = () => {
    dispatchPopupWindow({
      header: header,
      body: <ClassroomInfo
          classroom={classroom}
          dispatchNotification={dispatchNotification}
        />,
      footer: <Footer classroomName={name} occupied={occupied} dispatchNotification={dispatchNotification}/>,
    });
  };

  return (
    <>
      <li
        key={id}
        className={styles.classroomsListItem}
        style={occupied ? occupiedStyle : vacantStyle}
        onClick={handleClick}
      >
        <div className={styles.header}>
          <h1>{name}</h1>
          <div className={styles.occupantInfo}>
            <p className={styles.occupantName}>
              {fullName(occupied?.user, true)}
            </p>
            <p
              style={typeStyle(occupied as OccupiedInfo)}
              className={styles.occupantType}
            >
              {userTypesUa[occupied?.user.type as userTypes]}
            </p>
          </div>
        </div>
        <div className={styles.occupationInfo}>
          <p>{occupationInfo}</p>
        </div>
        <Instruments instruments={instruments} />
      </li>
    </>
  );
};

export default Classroom;
