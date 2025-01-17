"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Resume",
    embedded: false
  },
  {
    name: "Section",
    embedded: false
  },
  {
    name: "Block",
    embedded: false
  },
  {
    name: "Bullet",
    embedded: false
  },
  {
    name: "Paragraph",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://localhost:4467`
});
exports.prisma = new exports.Prisma();
