import React from "react";
import styles from "./scheduleUnit.module.css";
import { useQuery } from "@apollo/client";
import { GET_SCHEDULE_UNIT } from "../../api/operations/queries/schedule";
import {fullName, getScheduleUnitSize, ISODateString} from "../../helpers/helpers";
import { ScheduleUnitType } from "../../models/models";
import Button from "../button/Button";

interface PropTypes {
  classroomName: string;
}

const ScheduleUnit: React.FC<PropTypes> = ({ classroomName }) => {
  const { data, loading, error } = useQuery(GET_SCHEDULE_UNIT, {
    variables: {
      classroomName: classroomName,
      date: ISODateString(new Date()),
    },
  });
  if (!loading && !error)
    return (
      <ul
        style={{
          gridTemplateColumns: document.body.clientWidth>=1024?getScheduleUnitSize(
            data.schedule
              .slice()
              .sort(
                (a: ScheduleUnitType, b: ScheduleUnitType) =>
                  parseInt(a.from) - parseInt(b.from)
              ),
            false
          ):"1fr"
        }}
        className={styles.scheduleRow}
      >
        {data.schedule
          .slice()
          .sort(
            (a: ScheduleUnitType, b: ScheduleUnitType) =>
              parseInt(a.from) - parseInt(b.from)
          )
          .map((unit: ScheduleUnitType) => (
            <li><Button style={{height: "2rem", width: "100%"}}>{unit.from + " - " + unit.to + " " + fullName(unit.user, true)}</Button></li>
          ))}
      </ul>
    );
  return <p></p>;
};

export default ScheduleUnit;
