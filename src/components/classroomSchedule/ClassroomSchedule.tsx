import React from "react";
import { ScheduleUnit } from "../../models/models";
import styles from "./classroomSchedule.module.css";
import {getScheduleUnitRowLength} from "../../helpers/helpers";

type PropTypes = {
  schedule: Array<ScheduleUnit>;
};

const ClassroomSchedule: React.FC<PropTypes> = ({ schedule }) => {
  let scheduleUnitRowLength = getScheduleUnitRowLength(schedule, "fr");
  return (
    <div
      className={styles.scheduleTimeline}
      style={{ gridTemplateColumns: scheduleUnitRowLength }}
    >
      {schedule.map((scheduleUnit: ScheduleUnit) => {
        let { user, from, to } = scheduleUnit;
        let unitInfo = [user.lastName, from, "-", to].join(" ");
        return (
          <div className={styles.scheduleUnit}>
            <span>{unitInfo}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ClassroomSchedule;
