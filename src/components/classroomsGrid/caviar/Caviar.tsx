import React from "react";
import styles from "./caviar.module.css";
import { NavLink } from "react-router-dom";
import {Classroom} from "../../../models/models";

type Props = {
  classroomsFilter: (classroom: Classroom) => boolean;
  classrooms: Array<Classroom>;
};

const Caviar: React.FC<Props> = ({ classroomsFilter, classrooms }) => {

  return (
    <ul className={styles.caviarClassroomsList}>
      {classrooms
        .filter((classroom) => classroomsFilter(classroom))
        .map(({ name, id, occupied }: Classroom) => (
          <NavLink key={id} to={`/auditoriums/${name}`}>
            <li
              key={id}
              className={occupied ? "" : styles.released}
            >
              {name}
            </li>
          </NavLink>
        ))}
    </ul>
  );
};

export default Caviar;
