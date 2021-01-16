import React, {useState} from "react";
import {
  Classroom,
  OccupiedInfo,
  userTypeColors,
  userTypes,
  userTypesUa,
} from "../../../../models/models";
import styles from "./occupationInfo.module.css";
import {getTimeHHMM} from "../../../../helpers/helpers";
import Button from "../../../button/Button";
import {useMutation} from "@apollo/client";
import {FREE_CLASSROOM} from "../../../../api/operations/mutations/freeClassroom";
import UserPopup from "../../../user/UserPopup";
import {gridUpdate} from "../../../../api/client";

type PropTypes = {
  occupied: OccupiedInfo;
  classroom: Classroom;
  onClose: (value: string) => void;
  setReadyForRewriting: (value: boolean) => void;
};

const OccupationInfo: React.FC<PropTypes> = ({occupied, classroom, onClose, setReadyForRewriting}) => {
  const [freeClassroom, {data, error}] = useMutation(FREE_CLASSROOM, {
    variables: {
      input: {
        classroomName: String(classroom.name),
      },
    },
    update(cache, {data}) {
      cache.modify({
        fields: {
          classrooms(existingRelay, {toReference}) {
            const freedClassroomIndex = existingRelay.findIndex(
              (el: Classroom) => el.id === classroom.id
            );

            return existingRelay
              .slice()
              .splice(freedClassroomIndex, 1, {...classroom, occupied: data.freeClassroom.classroom.occupied});
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
  const [visibility, setVisibility] = useState("none");
  return (
    <div>
      <UserPopup visibility={visibility} onClose={() => setVisibility("none")} userData={occupied?.user}/>
      <div className={styles.occupationInfo}>
        <Button
          onClick={() => setVisibility("block")}
          style={{
            backgroundColor: userTypeColors[occupied.user.type as userTypes],
          }}
        >
          {[fullName, "— ", userTypesUa[occupied.user.type as userTypes]].join(
            " "
          )}
        </Button>
        {(occupied.user.type === userTypes.STUDENT || occupied.user.type===userTypes.POST_GRADUATE)&&
        <div className={styles.until}>
          Зайнято до {getTimeHHMM(new Date(occupied.until))}
        </div>}
        <div className={styles.buttons}>
          <Button
            type="button"
            onClick={() => {
              setReadyForRewriting(true)
            }}
          >
            Передати аудиторію
          </Button>
          <Button
            type="button"
            onClick={() => {
              freeClassroom().then(() => {
                gridUpdate(!gridUpdate())
                onClose("none")
              });
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
