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
        }
    }
`;