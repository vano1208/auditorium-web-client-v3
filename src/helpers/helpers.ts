import { HOUR, MINUTE, TIME_SNIPPETS } from "./constants";
import { ScheduleUnit } from "../models/models";

export const getScheduleTimeline = (start: number, end: number): string[] => {
  let timeSnippets: string[] = [];
  for (let hour = start; hour <= end; hour++) {
    if (hour === end) {
      timeSnippets.push(hour + ":00");
    } else {
      TIME_SNIPPETS.forEach((minutes) => {
        timeSnippets.push(hour + minutes);
      });
    }
  }
  return timeSnippets;
};

const getScheduleTimeInMilliseconds = (scheduleUnitTime: any) => {
  return scheduleUnitTime
    .split(":")
    .map((el: any, index: number) => {
      return index === 0 ? Number(el) * HOUR : Number(el) * MINUTE;
    })
    .reduce((acc: any, curr: any) => acc + curr);
};

export const getPossiblyOccupied = (schedule: Array<any>) => {
  const current =
    new Date().getHours() * HOUR + new Date().getMinutes() * MINUTE;
  const timeSnippets = schedule.map((el: any) => {
    return {
      from: getScheduleTimeInMilliseconds(el.from),
      to: getScheduleTimeInMilliseconds(el.to),
    };
  });
  return timeSnippets
    .map((el: any) => current > el.from < el.to)
    .every((el: any) => el === true);
};

export const getTimeHHMM = (date: Date) => {
  return date.getHours() + ":" + date.getMinutes();
};

export const getScheduleUnitRowLength = (
  schedule: Array<ScheduleUnit>,
  units: string
) =>
  schedule
    .map((scheduleUnit: ScheduleUnit) => {
      return parseInt(scheduleUnit.to) - parseInt(scheduleUnit.from) + units;
    })
    .join(" ");
