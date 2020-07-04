const { gql } = require("apollo-server");

module.exports = gql`
  extend type Query {
    sectionBlocks(section: ID!): SectionBlock!
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
    updateBlock(
      id: ID!
      title1: String!
      title2: String
      subtitle1: String
      subtitle2: String
    ): Block!

    deleteBlock(id: ID!): Block!
  }

  type Block {
    id: ID!
    title1: String!
    title2: String
    subtitle1: String
    subtitle2: String
    order: Int!
    section: String!
    bullets: [Bullet]!
  }

  type SectionBlock {
    section: String!
    blocks: [Block!]!
  }
`;
