import { gql } from "@apollo/client";

export const GET_CLASSROOMS = gql`
  query getClassrooms($date: Date!) {
    classrooms {
      id
      name
      special
      chair
      isWing
      isOperaStudio
      occupied {
        user {
          id
          firstName
          patronymic
          lastName
          type
          nameTemp
          email
          phoneNumber
        }
        until
      }
      schedule(date: $date) {
        from
        to
      }
      instruments {
        type
        rate
      }
      disabled {
        comment
        until
      }
    }
  }
`;

export const GET_CLASSROOMS_SCHEDULE = gql`
  query getClassroomsSchedule($date: Date!) {
    classrooms {
      name
      schedule(date: $date) {
        user {
          firstName
          patronymic
          lastName
        }
        from
        to
        activity
      }
    }
  }
`;

export const GET_CLASSROOM_BY_NAME = gql`
  query getClassroomByName($name: String!, $date: Date!) {
    classroom(name: $name) {
      schedule(date: $date) {
        user {
          lastName
          firstName
          patronymic
        }
        activity
      }
      instruments {
        name
      }
    }
  }
`;
