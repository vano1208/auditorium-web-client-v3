import React, {useEffect, useState} from "react";
import styles from "./schedule.module.css";
import {getScheduleTimeline} from "../../helpers/helpers";
import {WORKING_DAY_END, WORKING_DAY_START} from "../../helpers/constants";
import {gql, useQuery} from "@apollo/client";
import {GET_CLASSROOMS} from "../../api/operations/queries/classrooms";
import {Classroom, ScheduleUnit} from "../../models/models";
import PageHeader from "../../components/pageHeader/PageHeader";
import Loading from "../../components/loading/Loading";
import {client} from "../../api/client";

const Schedule = () => {
  const [classrooms, setClassrooms] = useState<Array<Classroom>>();
  const [scheduleDate, setScheduleDate] = useState(new Date());
  const timelineMarks = ["8:00", "9:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
  const toDateInputValue = (date: Date) => {
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return date.toJSON().slice(0, 10);
  };
  const {data: gridUpdate} = useQuery(gql`
      query gridUpdate {
          gridUpdate @client
      }
  `);

  useEffect(() => {
    getClassrooms()
  }, [gridUpdate]);

  const getClassrooms = async () => {
    const {data: {classrooms}} = await client.query({
      query: GET_CLASSROOMS,
      variables: {
        date: new Date(scheduleDate).setHours(0, 0, 0, 0),
      },
      fetchPolicy: 'cache-first'
    });
    setClassrooms(classrooms.slice()
      .sort((a: Classroom, b: Classroom) => Number(a.name) - Number(b.name)));
  };
  let timeSnippets: string[] = getScheduleTimeline(
    WORKING_DAY_START,
    WORKING_DAY_END
  );
  return (
    <>
      <PageHeader body="Розклад">
        <input className={styles.scheduleDateInput}
               type="date"
               onChange={(e) => setScheduleDate(new Date(e.target.value))}
               defaultValue={toDateInputValue(new Date())}
        />
      </PageHeader>
      {classrooms!==undefined?<div className={styles.scheduleTable}>
        <table className={styles.tg}>
          <thead>
          <tr>
            <th></th>
            {timeSnippets.map((el: any) => (
              <th className={styles.tg_0pky}>
                {timelineMarks.map(mark => el === mark ? el : null)}
              </th>
            ))}
          </tr>
          </thead>
          <tbody>
          {(classrooms as Array<Classroom>).map((cl: any) => {
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
      </div>:<Loading/>}
    </>
  );
};

export default Schedule;
