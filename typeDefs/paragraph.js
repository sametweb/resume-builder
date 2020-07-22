const { gql } = require("apollo-server");

module.exports = gql`
  extend type Query {
    sectionParagraph(section: ID!): Paragraph
  }

  extend type Mutation {
    createParagraph(text: String!, section: ID!): Paragraph!
    updateParagraph(text: String!, id: ID!): Paragraph!
    deleteParagraph(id: ID!): Paragraph!
  }

  type Paragraph {
    id: ID!
    text: String!
    section: Section
  }
`;
