const { gql } = require("apollo-server");

const resumeTypeDef = require("./resume");

const typeDefs = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;

module.exports = [typeDefs, resumeTypeDef];
