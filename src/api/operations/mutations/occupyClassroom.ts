import { gql } from "@apollo/client";

export const OCCUPY_CLASSROOM = gql`
    mutation occupyClassroom($input: OccupyClassroomInput!) {
        occupyClassroom(input: $input) {
            classroom {
                occupied {
                    user {
                        id
                        firstName
                        patronymic
                        lastName
                        type
                        department
                    }
                    until
                }
            }
            userErrors {
                message
                code
            }
        }
    }
`;