import { gql } from "@apollo/client";

export const OCCUPY_CLASSROOM = gql`
    mutation occupyClassroom($input: OccupyClassroomInput!) {
        occupyClassroom(input: $input) {
            classroom {
                id
                name
                special
                chair
                occupied {
                    user {
                        id
                        firstName
                        patronymic
                        lastName
                        type
                        department
                    }
                }
                instruments {
                    type
                    name
                    rate
                }
            }
            userErrors {
                message
                code
            }
        }
    }
`;