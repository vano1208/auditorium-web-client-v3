import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
import Header from "../../components/header/Header";
import { ClassroomType, notificationsTypes } from "../../models/models";
import Classroom from "../../components/classroom/Classroom";
import styles from "./classrooms.module.css";
import Caviar from "../../components/caviar/Caviar";
import { useNotification } from "../../components/notification/NotificationProvider";

type PropTypes = {
  classrooms: Array<ClassroomType> | undefined;
};

const Classrooms: React.FC<PropTypes> = ({ classrooms }) => {
  const [filter, setFilter] = useState("ALL");
  const dispatchNotification = useNotification();

  useEffect(()=>{}, [])

  const filterClassrooms = (classroom: ClassroomType) => {
    switch (filter) {
      case "ALL":
        return true;
      case "FREE":
        return !classroom.occupied;
      case "SPECIAL":
        return !!classroom.special;
    }
  };

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div className={styles.classroomsPage}>
      <Header>
          <h1>Аудиторії</h1>
          <select
            className={styles.selectClassroomsFilter}
            name="classroomsFilter"
            id="classroomsFilter"
            onChange={handleFilterChange}
          >
            <option value="ALL">Всі</option>
            <option value="FREE">Вільні</option>
            <option value="SPECIAL">Спеціалізовані</option>
          </select>
      </Header>
      {classrooms?.length !== 0 && (
        <Caviar
          dispatchNotification={dispatchNotification}
          classrooms={
            classrooms?.filter((classroom) =>
              filterClassrooms(classroom)
            ) as Array<ClassroomType>
          }
        />
      )}
      <ul className={styles.classroomsList}>
        {(classrooms as Array<ClassroomType>) !== undefined &&
          (classrooms as Array<ClassroomType>)
            .filter((classroom) => filterClassrooms(classroom))
            .map((classroom) => (
              <Classroom
                dispatchNotification={dispatchNotification}
                key={classroom.id}
                classroom={classroom}
              />
            ))}
      </ul>
    </div>
  );
};

export default Classrooms;
