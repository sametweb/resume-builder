const { gql } = require("apollo-server");

module.exports = gql`
  extend type Query {
    resumeSections(id: ID!): [Section]!
  }

  extend type Mutation {
    createSection(title: String!, resume: ID!): Section!
    updateSection(id: ID!, title: String!): Section!
    deleteSection(id: ID): Section!
  }

  type Section {
    id: ID!
    resume: Resume!
    title: String!
  }
`;
