const { mutations } = require("./mutations");
const { queries } = require("./queries");

exports.resolvers = {
    Query: { ...queries },
    Mutation: { ...mutations },
};