import {gql} from "@apollo/client";

export const VERIFY_USER = gql`
    mutation verifyUser($input: VerifyUserInput !) {
        verifyUser(input: $input) {
            user {
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
            userErrors {
                message
                code
            }
        }
    }
`;
