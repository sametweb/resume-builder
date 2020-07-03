import { gql } from "apollo-boost";

export const USER_RESUMES = gql`
  query resumes($user: String!) {
    userResumes(user: $user) {
      id
      title
      sections {
        id
        title
        order
        blocks {
          id
          title1
          title2
          subtitle1
          subtitle2
          bullets {
            id
            text
            order
          }
        }
      }
    }
  }
`;

export const GET_RESUME_BY_ID = gql`
  query resumeById($id: ID!, $user: String!) {
    resumeById(id: $id, user: $user) {
      id
      title
      user
      sections {
        id
        title
        order
        blocks {
          id
          title1
          title2
          subtitle1
          subtitle2
          bullets {
            id
            text
            order
          }
        }
      }
    }
  }
`;
