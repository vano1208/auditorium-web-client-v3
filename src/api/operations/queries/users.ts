import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getUsers {
    users {
      id
      firstName
      patronymic
      lastName
      type
      department {
        name
      }
      email
      phoneNumber
      extraPhoneNumbers
      nameTemp
      studentInfo {
        degree {
          name
        }
        startYear
        accountStatus
      }
      employeeInfo {
        employmentType
        accountStatus
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserById($id: Int!) {
    user(id: $id) {
      id
      firstName
      patronymic
      lastName
      type
      department {
        name
      }
      email
      phoneNumber
      extraPhoneNumbers
      nameTemp
      studentInfo {
        degree {
          name
        }
        startYear
        accountStatus
      }
      employeeInfo {
        employmentType
        accountStatus
      }
    }
  }
`;
