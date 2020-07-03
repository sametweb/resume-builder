const { gql } = require("apollo-server");

module.exports = gql`
  extend type Query {
    blockBullets(block: ID!): [Bullet!]!
  }

  extend type Mutation {
    createBullet(text: String!, order: Int!, block: ID!): Bullet!
  }

  type Bullet {
    id: ID!
    text: String!
    order: Int!
  }
`;
