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
            verified
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

export const GET_USER_BY_ID = gql`
    query getUsers($id: Int!) {
        user(id: $id) {
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
            verified
        }
    }
`;