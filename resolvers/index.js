const resumeResolver = require("./resumeResolver");
const sectionResolver = require("./sectionResolver");
const blockResolver = require("./blockResolver");
const bulletResolver = require("./bulletResolver");
const paragraphResolver = require("./paragraphResolver");

module.exports = [
  resumeResolver,
  sectionResolver,
  blockResolver,
  bulletResolver,
  paragraphResolver,
];
