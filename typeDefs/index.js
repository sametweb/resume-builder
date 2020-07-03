const { gql } = require("apollo-server");

const resumeTypeDef = require("./resume");
const sectionTypeDef = require("./section");
const blockTypeDef = require("./block");
const bulletTypeDef = require("./bullet");

const typeDefs = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;

module.exports = [
  typeDefs,
  resumeTypeDef,
  sectionTypeDef,
  blockTypeDef,
  bulletTypeDef,
];
