import { gql } from "apollo-boost";

export const ADD_RESUME = gql`
  mutation addResume($title: String!, $user: String!) {
    createResume(title: $title, user: $user) {
      id
      title
      user
    }
  }
`;

export const UPDATE_RESUME = gql`
  mutation updateResume($id: ID!, $title: String!) {
    updateResume(id: $id, title: $title) {
      id
      title
    }
  }
`;

export const DELETE_RESUME = gql`
  mutation deleteResume($id: ID!) {
    deleteResume(id: $id) {
      id
      title
    }
  }
`;
