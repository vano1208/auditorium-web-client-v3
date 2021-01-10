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
        user {
          firstName
          patronymic
          lastName
        }
        from
        to
        activity
      }
      instruments {
        type
        name
        rate
      }
      disabled {
          comment
          until
      }
    }
  }
`;
