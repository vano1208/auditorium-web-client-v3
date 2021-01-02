import React from "react";
import {
  Classroom,
  OccupiedInfo,
  userTypeColors,
  userTypes,
  userTypesUa,
} from "../../../../models/models";
import styles from "./occupationInfo.module.css";
import { getTimeHHMM } from "../../../../helpers/helpers";
import Button from "../../../button/Button";
import { useLazyQuery, useMutation } from "@apollo/client";
import { FREE_CLASSROOM } from "../../../../api/operations/mutations/freeClassroom";
import { GET_CLASSROOMS } from "../../../../api/operations/queries/classrooms";

type PropTypes = {
  occupied: OccupiedInfo;
  classroom: Classroom;
};

const OccupationInfo: React.FC<PropTypes> = ({ occupied, classroom }) => {
  const [freeClassroom] = useMutation(FREE_CLASSROOM, {
    variables: {
      input: {
        classroomName: String(classroom.name),
      },
    },
  });
  const [getClassrooms] = useLazyQuery(GET_CLASSROOMS, {
    variables: {
      date: new Date().toString(),
    },
    fetchPolicy: "network-only",
  });
  const fullName =
    occupied?.user.nameTemp === null
      ? [
          occupied?.user.lastName,
          occupied?.user.firstName.charAt(0) + ".",
          occupied?.user.patronymic?.charAt(0) + ".",
        ].join(" ")
      : occupied?.user.nameTemp;
  return (
    <div>
      <div className={styles.occupationInfo}>
        <div
          className={styles.occupant}
          style={{
            backgroundColor: userTypeColors[occupied.user.type as userTypes],
          }}
        >
          {[fullName, "— ", userTypesUa[occupied.user.type as userTypes]].join(
            " "
          )}
        </div>
        <div className={styles.until}>
          Зайнято до {getTimeHHMM(new Date(occupied.until))}
        </div>
          <div className={styles.buttons}>
          <Button
              type="button"
              onClick={() => {
                  freeClassroom().then((r) => getClassrooms());
              }}
          >
              Передати аудиторію
          </Button>
          <Button
              type="button"
              onClick={() => {
                  freeClassroom().then((r) => getClassrooms());
              }}
          >
              Звільнити аудиторію
          </Button>
          </div>
      </div>

    </div>
  );
};

export default OccupationInfo;
