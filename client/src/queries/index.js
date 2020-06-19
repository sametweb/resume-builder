import { gql } from "apollo-boost";

export const USER_RESUMES = gql`
  query resumes($user: String!) {
    userResumes(user: $user) {
      id
      title
    }
  }
`;
