import { gql } from "@apollo/client";

export const GET_DEPARTMENTS = gql`
    query getDpartments {
        departments {
            id
            name
        }
    }
`;