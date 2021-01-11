import React from "react";
import styles from "./schedule.module.css";
import { getScheduleTimeline } from "../../helpers/helpers";
import { WORKING_DAY_END, WORKING_DAY_START } from "../../helpers/constants";
import { useQuery } from "@apollo/client";
import { GET_CLASSROOMS } from "../../api/operations/queries/classrooms";
import { ScheduleUnit } from "../../models/models";
import PageHeader from "../pageHeader/PageHeader";

const Schedule = () => {
  const timelineMarks = ["8:00", "9:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00","16:00", "17:00", "18:00", "19:00", "20:00"]
  const { loading, error, data } = useQuery(GET_CLASSROOMS, {
    variables: {
      date: new Date().toString(),
    },
  });
  let timeSnippets: string[] = getScheduleTimeline(
    WORKING_DAY_START,
    WORKING_DAY_END
  );
  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;
  return (
    <>
      <PageHeader body="Розклад"></PageHeader>
      <div className={styles.scheduleTable}>
        <table className={styles.tg}>
          <thead>
            <tr>
              <th></th>
              {timeSnippets.map((el: any) => (
                <th className={styles.tg_0pky}>
                  {timelineMarks.map(mark=>el===mark?el:null)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.classrooms.map((cl: any) => {
              let tempArray = timeSnippets;
              cl.schedule.map((scheduleUnit: any) => {
                let unitFrom = timeSnippets.findIndex(
                  (el: string) => el === scheduleUnit.from
                );
                let unitTo = timeSnippets.findIndex(
                  (el: string) => el === scheduleUnit.to
                );
                tempArray.fill("del", unitFrom + 1, unitTo);
                return null;
              });
              return (
                <tr className={styles.classroomRow}>
                  <td className={styles.classroomName}>{cl.name}</td>
                  {tempArray.map((el: any) => {
                    let colSpanNum = cl.schedule.map(
                      (scheduleUnit: ScheduleUnit) => {
                        let from = timeSnippets.indexOf(scheduleUnit.from);
                        let to = timeSnippets.indexOf(scheduleUnit.to);
                        let term = to - from;
                        if (scheduleUnit.from === el) {
                          return term.toString();
                        } else {
                          return null;
                        }
                      }
                    );
                    return el !== "del" ? (
                      <td
                        className={styles.tg_0lax}
                        colSpan={colSpanNum.join().replace(",", "")}
                      >
                        {cl.schedule.map((scheduleUnit: ScheduleUnit) => {
                          if (scheduleUnit.from === el) {
                            return (
                              <div className={styles.occupied}>
                                <p>
                                  {scheduleUnit.user.lastName +
                                    " " +
                                    scheduleUnit.from +
                                    " — " +
                                    scheduleUnit.to}
                                </p>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </td>
                    ) : null;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Schedule;
