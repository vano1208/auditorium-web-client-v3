import React, { useState } from "react";
import styles from "./schedule.module.css";
import { getScheduleTimeline } from "../../helpers/helpers";
import { WORKING_DAY_END, WORKING_DAY_START } from "../../helpers/constants";
import { useQuery } from "@apollo/client";
import { GET_CLASSROOMS } from "../../api/operations/queries/classrooms";

const Schedule = () => {
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
      <div className={styles.scheduleTable}>
        <table className={styles.tg}>
          <thead>
            <tr>
              <th></th>
              {timeSnippets.map((el: any) => (
                <th className={styles.tg_0pky}>
                  {el === "8:00" ||
                  el === "10:00" ||
                  el === "12:00" ||
                  el === "14:00" ||
                  el === "16:00" ||
                  el === "18:00"
                    ? el
                    : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.classrooms.map((cl: any) => {
              let tempArray = timeSnippets;
              cl.schedule.map((scheduleUnit: any) => {
                let unitFrom = timeSnippets.findIndex(
                  (el: any) => el === scheduleUnit.from
                );
                let unitTo = timeSnippets.findIndex(
                  (el: any) => el === scheduleUnit.to
                );
                tempArray.fill("del", unitFrom + 1, unitTo);
              });
              return (
                <tr className={styles.classroomRow}>
                  <td className={styles.classroomName}>{cl.name}</td>
                  {tempArray.map((el: any) => {
                    let colSpanNum = cl.schedule.map((scheduleUnit: any) => {
                      let from = timeSnippets.indexOf(scheduleUnit.from);
                      let to = timeSnippets.indexOf(scheduleUnit.to);
                      let term = to - from;
                      if (scheduleUnit.from === el) {
                        return term.toString();
                      } else {
                        return null;
                      }
                    });
                    return el != "del" ? (
                      <td
                        className={styles.tg_0lax}
                        colSpan={colSpanNum.join().replace(",", "")}
                      >
                        {cl.schedule.map((scheduleUnit: any) => {
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
