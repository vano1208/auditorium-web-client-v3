import {
  HOUR,
  MINUTE,
  TIME_SNIPPETS,
  WORKING_DAY_END,
  WORKING_DAY_START,
} from "./constants";
import {
  OccupiedInfo,
  ScheduleUnitType,
  User,
  userTypes,
} from "../models/models";

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
    .map((el: any) => {
      return current >= el.from && current <= el.to;
    })
    .some((el: any) => el === true);
};

export const getTimeHHMM = (date: Date) => {
  return date.getHours() + ":" + formatMinutesToMM(date.getMinutes());
};

export const getScheduleUnitRowLength = (
  schedule: Array<ScheduleUnitType>,
  units: string
) =>
  schedule
    .map((scheduleUnit: ScheduleUnitType) => {
      return parseInt(scheduleUnit.to) - parseInt(scheduleUnit.from) + units;
    })
    .join(" ");

export const formatMinutesToMM = (value: number) => {
  if (value <= 9) return `0${value}`;
  else return value;
};

export const fullName = (user: User | undefined, withInitials = false) => {
  if (user !== undefined) {
    if (withInitials) {
      return `${user.lastName} ${user.firstName.charAt(0)}. ${
        user.patronymic ? user.patronymic.charAt(0) + "." : ""
      }`;
    } else {
      return `${user.lastName} ${user.firstName} ${
        user.patronymic ? user.patronymic : ""
      }`;
    }
  }
  return "";
};

export const typeStyle = (occupied: OccupiedInfo) => {
  const student = { backgroundColor: "rgba(46,40,124)", color: "#fff" };
  const employee = { backgroundColor: "#ffc000", color: "#fff" };
  const vacant = {
    backgroundColor: "transparent",
    color: "#000",
  };
  if (occupied !== null) {
    switch (occupied.user.type) {
      case userTypes.STUDENT:
        return student;
      case userTypes.POST_GRADUATE:
        return student;
      default:
        return employee;
    }
  }
  return vacant;
};

//get int from time unit. ex: "9:15" -> 36 where each 15 min == 1; ex: "00:15" -> 1, "10:00" ->40
const simpleIntFromScheduleUnit = (time: string) => {
  const reducer = (accumulator: any, currentValue: any) =>
    accumulator + currentValue;
  return time
    .split(":")
    .map((el: string, index: number) => {
      if (index === 0) {
        return parseInt(el) * 4;
      } else {
        switch (parseInt(el)) {
          case 0:
            return 0;
          case 15:
            return 1;
          case 30:
            return 2;
          case 45:
            return 3;
        }
      }
    })
    .reduce(reducer);
};

//get schedule units size in fr units for grids
export const getScheduleUnitSize = (
  units: Array<ScheduleUnitType>,
  fillEmpty = true
) => {
  const items = [];
  if (fillEmpty) {
    items.push(parseInt(units[0].from) - WORKING_DAY_START);
  }
  for (let item of units) {
    const from = simpleIntFromScheduleUnit(item.from);
    const to = simpleIntFromScheduleUnit(item.to);
    items.push((to as number) - (from as number));
  }
  if (fillEmpty) {
    items.push(WORKING_DAY_END - parseInt(units[units.length - 1].to));
  }

  return items.map((item) => `${item}fr`).join(" ");
};

export const ISODateString = (d: Date) => {
  function pad(n: any) {
    return n < 10 ? "0" + n : n;
  }
  return (
    d.getUTCFullYear() +
    "-" +
    pad(d.getUTCMonth() + 1) +
    "-" +
    pad(d.getUTCDate())
    // +
    // "T" +
    // pad(d.getUTCHours()) +
    // ":" +
    // pad(d.getUTCMinutes()) +
    // ":" +
    // pad(d.getUTCSeconds()) +
    // "Z"
  );
};
