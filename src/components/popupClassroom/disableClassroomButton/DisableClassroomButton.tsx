import React from "react";
import Button from "../../button/Button";
import { useMutation } from "@apollo/client";
import { DISABLE_CLASSROOM } from "../../../api/operations/mutations/disableClassroom";
import { Classroom, DisabledInfo } from "../../../models/models";
import { ENABLE_CLASSROOM } from "../../../api/operations/mutations/enableClassroom";
import { gridUpdate } from "../../../api/client";

interface PT {
  classroom: Classroom;
  disabled: DisabledInfo | null;
  onClose: (value: string) => void;
}

const DisableClassroomButton: React.FC<PT> = ({
  classroom,
  disabled,
  onClose,
}) => {
  const [disableClassroom] = useMutation(DISABLE_CLASSROOM, {
    variables: {
      input: {
        classroomName: classroom.name,
        comment: "Аудиторію відключено",
        until: new Date(),
      },
    },
    // update(cache, { data }) {
    //   cache.modify({
    //     fields: {
    //       classrooms(existingRelay, { toReference }) {
    //         const disabledClassroomIndex = existingRelay.findIndex(
    //           (el: Classroom) => el.id === classroom.id
    //         );
    //         debugger;
    //         return existingRelay
    //           .slice()
    //           .splice(
    //             disabledClassroomIndex,
    //             1,
    //             data.disableClassroom.classroom
    //           );
    //       },
    //     },
    //   });
    // },
  });
  const [enableClassroom] = useMutation(ENABLE_CLASSROOM, {
    variables: {
      input: {
        classroomName: classroom.name,
      },
    },
  });
  const onClick = () => {
    if (disabled) {
      console.log("Разблокировано");
      enableClassroom().then((r) => {
        gridUpdate(!gridUpdate());
        onClose("none");
      });
    } else {
      console.log("Заблокировано");
      disableClassroom().then((r) => {
        gridUpdate(!gridUpdate());
        onClose("none");
      });
    }
  };
  return (
    <>
      <Button onClick={onClick}>
        {!disabled ? "Заблокувати аудиторію" : "Разблокувати аудиторію"}
      </Button>
    </>
  );
};

export default DisableClassroomButton;
