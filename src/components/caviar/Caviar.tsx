import React from "react";
import styles from "./caviar.module.css";
import { useHistory } from "react-router-dom";
import { Classroom } from "../../models/models";

type Props = {
  classroomsFilter: (classroom: Classroom) => boolean;
  classrooms: Array<Classroom>;
  onClose: (value: string)=>void;
};

const Caviar: React.FC<Props> = ({ classroomsFilter, classrooms , onClose}) => {
  const history = useHistory();
  const onClick = (name: string) => {
    history.push("/auditoriums/" + name);
    onClose("block")
  };
  return (
    <ul className={styles.caviarClassroomsList}>
      {classrooms
        .filter((classroom) => classroomsFilter(classroom))
        .map(({ name, id, occupied }: Classroom) => (
          <li
            onClick={() => onClick(name)}
            key={id}
            className={occupied ? "" : styles.released}
          >
            {name}
          </li>
        ))}
    </ul>
  );
};

export default Caviar;
