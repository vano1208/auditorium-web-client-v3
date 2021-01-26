import React, { useState } from "react";
import Button from "../../button/Button";
import { useMutation } from "@apollo/client";
import { DISABLE_CLASSROOM } from "../../../api/operations/mutations/disableClassroom";
import { Classroom, DisabledInfo } from "../../../models/models";
import { ENABLE_CLASSROOM } from "../../../api/operations/mutations/enableClassroom";
import { gridUpdate } from "../../../api/client";
import PopupWindow from "../../popupWindow/PopupWindow";
import styles from "./disableClassroomButton.module.css";

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
  const [visibility, setVisibility] = useState("none");
  const [disableComment, setDisableComment] = useState("");
  const [disableUntil, setDisableUntil] = useState(new Date());
  const [disableClassroom] = useMutation(DISABLE_CLASSROOM, {
    variables: {
      input: {
        classroomName: classroom.name,
        comment: disableComment,
        until: new Date(disableUntil),
      },
    },
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
      enableClassroom().then((r) => {
        gridUpdate(!gridUpdate());
        onClose("none");
      });
    } else {
      disableClassroom().then((r) => {
        gridUpdate(!gridUpdate());
        onClose("none");
      });
    }
  };
  const onClosePopup = (value: string) => {
    setVisibility("none");
  };
  return (
    <>
      <PopupWindow
        headerBody="Заблокувати аудиторію"
        onClose={onClosePopup}
        visibility={visibility}
      >
        <div>
          <form>
            <label htmlFor="disableComment" style={{ marginRight: "16px" }}>
              Коментар (від 4 до 24 символів):{" "}
              <input
                className={styles.inputField}
                type="text"
                name="disableComment"
                id="disableComment"
                value={disableComment}
                onChange={(e) => setDisableComment(e.target.value)}
              />
            </label>
            <label htmlFor="disableUntil">
              До:{" "}
              <input
                className={styles.disableClassroomDateInput}
                type="date"
                name="disableUntil"
                id="disableUntil"
                onChange={(e) => setDisableUntil(new Date(e.target.value))}
              />
            </label>
            <Button
              type="submit"
              style={{ position: "absolute", right: "16px", bottom: "16px" }}
              disabled={
                !(disableComment.length > 3 && disableComment.length < 25)
              }
              onClick={() => {
                onClick();
                onClosePopup("none");
                setDisableComment("");
                setDisableUntil(new Date());
              }}
            >
              Заблокувати аудиторію
            </Button>
          </form>
        </div>
      </PopupWindow>
      <Button onClick={!disabled ? () => setVisibility("block") : onClick}>
        {!disabled ? "Заблокувати аудиторію" : "Разблокувати аудиторію"}
      </Button>
    </>
  );
};

export default DisableClassroomButton;
