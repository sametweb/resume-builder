const { gql } = require("apollo-server");

module.exports = gql`
  extend type Query {
    resumeSections(id: ID!): [Section]!
  }

  extend type Mutation {
    createSection(title: String!, resume: ID!, order: Int!): Section!
    updateSection(id: ID!, title: String!, order: Int!): Section!
    updateSectionOrder(
      id: ID!
      resume_id: ID!
      order: Int!
      new_order: Int!
    ): Section!
    deleteSection(id: ID): Section!
  }

  type Section {
    id: ID!
    resume: Resume!
    title: String!
    order: Int!
    blocks: [Block]
    paragraph: Paragraph
  }
`;
