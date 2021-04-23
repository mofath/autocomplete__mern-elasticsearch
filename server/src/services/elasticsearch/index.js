
const addDocument = require("./addDocument");
const addManyDocuments = require("./addManyDocuments");
const addMapping = require("./addMapping");
const connect = require("./connect");
const countDocuments = require("./countDocuments");
const createIndex = require("./createIndex");
const deleteDocument = require("./deleteDocument");
const deleteIndex = require("./deleteIndex");
const getAllDocuments = require("./getAllDocuments");
const isIndexExist = require("./isIndexExist");
const search = require("./search");

module.exports = {
  addDocument,
  addManyDocuments,
  addMapping,
  connect,
  countDocuments,
  createIndex,
  deleteIndex,
  deleteDocument,
  getAllDocuments,
  isIndexExist,
  search,
};

