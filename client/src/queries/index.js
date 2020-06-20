import { gql } from "apollo-boost";

export const USER_RESUMES = gql`
  query resumes($user: String!) {
    userResumes(user: $user) {
      id
      title
    }
  }
`;

export const GET_RESUME_BY_ID = gql`
  query resumeById($id: ID!) {
    resumeById(id: $id) {
      id
      title
      user
    }
  }
`;
