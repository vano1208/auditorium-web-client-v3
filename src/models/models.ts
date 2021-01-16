import {string} from "yup/es";

export enum userTypes {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  POST_GRADUATE = "POST_GRADUATE",
  ADMINISTRATION = "ADMINISTRATION",
  CONCERTMASTER = "CONCERTMASTER",
  ILLUSTRATOR = "ILLUSTRATOR",
  OTHER = "OTHER",
}

export enum userTypesUa {
  STUDENT = "Студент",
  TEACHER = "Викладач",
  POST_GRADUATE = "Асистент/аспірант",
  ADMINISTRATION = "Адміністрація",
  CONCERTMASTER = "Концертмейстер",
  ILLUSTRATOR = "Іллюстратор",
  OTHER = "Не визначено"
}

export enum userTypeColors {
  STUDENT = "#1e2c4f",
  TEACHER = "#ffa200",
  POST_GRADUATE = "#1e2c4f",
  ADMINISTRATION = "#ffa200",
  ILLUSTRATOR = "#ffa200",
  CONCERTMASTER = "#ffa200",
  OTHER = "#ffa200",
}

export type User = {
  id: string;
  firstName: string;
  patronymic: string | null;
  lastName: string;
  type: string;
  department: string;
  email: string;
  phoneNumber: string;
  extraPhoneNumbers: string | null;
  nameTemp: string | null;
  startYear: number;
  degree: string
};

export type OccupiedInfo = {
  user: User;
  until: Date;
};

export type Comment = {
  id: string;
  user: User;
  body: string;
  date: Date;
};

export type InstrumentType = {
  id: string;
  type: string;
  name: string;
  rate: number;
  comments: Comment | null;
  classroom: Classroom;
};

export type DisabledInfo = {
  comment: string;
  until: Date;
};

export type ScheduleUnit = {
  id: string;
  user: User;
  classroom: Classroom;
  dateStart: Date;
  dateEnd: Date;
  dayOfWeek: number;
  from: string;
  to: string;
  activity: string;
};

export type Classroom = {
  id: string;
  name: string;
  chair: string | null;
  special: string | null;
  floor: number;
  isWing: boolean;
  isOperaStudio: boolean;
  description: string | null;
  occupied: OccupiedInfo | null;
  instruments: Array<InstrumentType>;
  disabled: DisabledInfo | null;
  schedule: Array<ScheduleUnit>;
};

export type RegisterUnit = {
  id: string
  user: {
    lastName: string
    firstName: string
    patronymic: string
    type: string
    id: string
    nameTemp: string
  }
  nameTemp: string
  classroom: {
    id: string
    name: string
}
  start: string
  end: string

}

export type Degree = {
  name: string
  startMonth: number
  startDay: number
  durationMonth: number
}

export type Department = {
  id: string
  name: string
}