const { gql } = require("apollo-server");

module.exports = gql`
  extend type Query {
    sectionBlocks(section: ID!): [Block!]!
  }

  extend type Mutation {
    createBlock(
      title1: String!
      title2: String
      subtitle1: String
      subtitle2: String
      order: Int!
      section: ID!
    ): Block!
    deleteBlock(id: ID!): Block!
  }

  type Block {
    id: ID!
    section: Section!
    title1: String!
    title2: String
    subtitle1: String
    subtitle2: String
    bullets: [Bullet]!
  }
`;
