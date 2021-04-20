
const addDocument = require("./addDocument");
const addManyDocuments = require("./addManyDocuments");
const addMapping = require("./addMapping");
const esConnect = require("./esConnect");
const countDocuments = require("./countDocuments");
const createIndex = require("./createIndex");
const deleteDocument = require("./deleteDocument");
const deleteIndex = require("./deleteIndex");
const getAllDocuments = require("./getAllDocuments");
const isIndexExist = require("./isIndexExist");
const esSearch = require("./esSearch");

module.exports = {
  addDocument,
  addManyDocuments,
  addMapping,
  esConnect,
  countDocuments,
  createIndex,
  deleteIndex,
  deleteDocument,
  getAllDocuments,
  isIndexExist,
  esSearch
};

