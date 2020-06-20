const { gql } = require("apollo-server");

module.exports = gql`
  extend type Query {
    userResumes(user: String!): [Resume!]!
    resumeById(id: ID!): Resume!
  }

  extend type Mutation {
    createResume(title: String!, user: String!): Resume!
    updateResume(id: ID!, title: String): Resume!
    deleteResume(id: ID): Resume!
  }

  type Resume {
    id: ID!
    title: String!
    user: String!
  }
`;
