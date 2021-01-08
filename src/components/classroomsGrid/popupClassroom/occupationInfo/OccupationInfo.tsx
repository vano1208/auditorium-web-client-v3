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
import { useMutation } from "@apollo/client";
import { FREE_CLASSROOM } from "../../../../api/operations/mutations/freeClassroom";

type PropTypes = {
  occupied: OccupiedInfo;
  classroom: Classroom;
  onClose: (value: string) => void;
};

const OccupationInfo: React.FC<PropTypes> = ({ occupied, classroom , onClose}) => {
  const [freeClassroom, { data, error }] = useMutation(FREE_CLASSROOM, {
    variables: {
      input: {
        classroomName: String(classroom.name),
      },
    },
    update(cache, { data }) {
      cache.modify({
        fields: {
          classrooms(existingRelay, { toReference }) {
            const freedClassroomIndex = existingRelay.findIndex(
              (el: Classroom) => el.id === data.freeClassroom.classroom.id
            );

            return existingRelay
              .slice()
              .splice(freedClassroomIndex, 1, data.freeClassroom.classroom);
          },
        },
      });
    },
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
              freeClassroom();
            }}
          >
            Передати аудиторію
          </Button>
          <Button
            type="button"
            onClick={() => {
              freeClassroom().then(()=> onClose("none"));
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
