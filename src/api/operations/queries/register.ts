import {gql} from "@apollo/client";

export const GET_REGISTER = gql`
    query getRegister($date: Date!) {
        register(date: $date) {
            id
            user {
                lastName
                firstName
                patronymic
                id
                type
                email
                phoneNumber
                nameTemp
            }
            classroom {
                name
            }
            nameTemp
            start
            end
        }
    }
`