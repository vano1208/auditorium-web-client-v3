import {gql} from "@apollo/client";

export const FREE_CLASSROOM = gql`
    mutation free($input: FreeClassroomInput!) {
        freeClassroom(input: $input) {
            classroom {
                occupied {
                    user {
                        id
                    }
                }
            }
                userErrors {
                    message
                    code
                }
            }
        }
`;
