import React, {useState} from "react";
import { Classroom } from "../../../models/models";
import GridElement from "./gridElement/GridElement";
import styles from "./classroomsGrid.module.css";
import PopupClassroom from "../popupClassroom/PopupClassroom";

type PropTypes = {
  classrooms: Array<Classroom>;
};

const ClassroomsGrid: React.FC<PropTypes> = ({ classrooms }) => {
    let [visibility, setVisibility] = useState("none");
    const onClose = (value:string) => {
        setVisibility(value);
    };
  return (
    <>
      <PopupClassroom classrooms={classrooms} visibility={visibility} onClose={onClose}/>
      <div className={styles.classrooms}>
        {classrooms
          .slice()
          .sort((a: Classroom, b: Classroom) => Number(a.name) - Number(b.name))
          .map((classroom: Classroom) => (
            <GridElement classroom={classroom} onClose={onClose}/>
          ))}
      </div>
    </>
  );
};

export default ClassroomsGrid;
