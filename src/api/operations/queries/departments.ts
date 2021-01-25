import { gql } from "@apollo/client";

export const GET_DEPARTMENTS = gql`
    query getDepartments {
        departments {
            id
            name
        }
    }
`;