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

export const ADD_SECTION = gql`
  mutation createSection($title: String!, $resume: ID!, $order: Int!) {
    createSection(title: $title, resume: $resume, order: $order) {
      id
      title
      order
    }
  }
`;

export const DELETE_SECTION = gql`
  mutation deleteSection($id: ID!) {
    deleteSection(id: $id) {
      id
      title
    }
  }
`;

export const UPDATE_SECTION_ORDER = gql`
  mutation updateSectionOrder(
    $id: ID!
    $resume_id: ID!
    $order: Int!
    $new_order: Int!
  ) {
    updateSectionOrder(
      id: $id
      resume_id: $resume_id
      order: $order
      new_order: $new_order
    ) {
      id
      title
      order
    }
  }
`;

export const ADD_BLOCK = gql`
  mutation createBlock(
    $title1: String!
    $title2: String
    $subtitle1: String
    $subtitle2: String
    $order: Int!
    $section: ID!
  ) {
    createBlock(
      title1: $title1
      title2: $title2
      subtitle1: $subtitle1
      subtitle2: $subtitle2
      order: $order
      section: $section
    ) {
      id
    }
  }
`;

export const UPDATE_BLOCK = gql`
  mutation updateBlock(
    $id: ID!
    $title1: String!
    $title2: String
    $subtitle1: String
    $subtitle2: String
  ) {
    updateBlock(
      id: $id
      title1: $title1
      title2: $title2
      subtitle1: $subtitle1
      subtitle2: $subtitle2
    ) {
      id
    }
  }
`;

export const DELETE_BLOCK = gql`
  mutation deleteBlock($id: ID!) {
    deleteBlock(id: $id) {
      id
    }
  }
`;

export const ADD_BULLET = gql`
  mutation createBullet($text: String!, $order: Int!, $block: ID!) {
    createBullet(text: $text, order: $order, block: $block) {
      id
    }
  }
`;

export const ADD_PARAGRAPH = gql`
  mutation createParagraph($text: String!, $section: ID!) {
    createParagraph(text: $text, section: $section) {
      id
      text
      section {
        id
        title
      }
    }
  }
`;
