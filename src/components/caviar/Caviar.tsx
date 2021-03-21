import React from "react";
import styles from "./caviar.module.css";
import { ClassroomType } from "../../models/models";
import { usePopupWindow } from "../popupWindow/PopupWindowProvider";
import Tag from "../tag/Tag";
import Button from "../button/Button";
import ClassroomInfo from "../aboutClassroom/ClassroomInfo";

interface PropTypes {
  classrooms: Array<ClassroomType>;
  dispatchNotification: (value: string) => void;
}

const Caviar: React.FC<PropTypes> = ({ classrooms, dispatchNotification }) => {
  const dispatchPopupWindow = usePopupWindow();
  const occupiedStyle = {
    background: "#fff",
  };
  const vacantStyle = {
    background: "#4bfd63",
  };


  const handleFreeClassroom = () => {
    // freeClassroom().then(() => gridUpdate(!gridUpdate()));
  };

  function handleClick(classroom: ClassroomType) {
    dispatchPopupWindow({
      header: (
        <>
          <h1>{`Аудиторія ${classroom.name}`}</h1>
          {classroom.isWing && <Tag body="Флігель" />}
          {classroom.isOperaStudio && <Tag body="Оперна студія" />}
        </>
      ),
      body: (
        <ClassroomInfo
          dispatchNotification={dispatchNotification}
          classroom={classroom}
        />
      ),
      footer: (
        <div className={styles.footer}>
          {classroom.occupied ? (
            <>
              <Button color="orange">Передати аудиторію</Button>
              <Button color="red" onClick={handleFreeClassroom}>
                Звільнити аудиторію
              </Button>
            </>
          ) : (
            <Button type="submit" form="userSearchForm">
              Записати в аудиторію
            </Button>
          )}
        </div>
      ),
    });
  }

  return (
    <ul className={styles.caviar}>
      {classrooms.map((classroom) => (
        <li
          onClick={() => handleClick(classroom)}
          style={classroom.occupied ? occupiedStyle : vacantStyle}
        >
          {classroom.name}
        </li>
      ))}
    </ul>
  );
};

export default Caviar;
