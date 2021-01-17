import { gql } from "@apollo/client";

export const GET_USERS = gql`
    query getUsers {
        users {
            id
            firstName
            patronymic
            lastName
            type
            department
            email
            phoneNumber
            extraPhoneNumbers
            nameTemp
            startYear
            degree
        }
    }
`;

export const GET_USERS_EMAIL_AND_PHONE = gql`
    query getUsersEmailAndPhone {
        users {
            email
            phoneNumber
        }
    }
`;