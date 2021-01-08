import { gql } from "@apollo/client";

export const FREE_CLASSROOM = gql`
  mutation free($input: FreeClassroomInput!) {
    freeClassroom(input: $input) {
      classroom {
        id
        name
        special
        chair
        occupied {
          user {
            id
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
