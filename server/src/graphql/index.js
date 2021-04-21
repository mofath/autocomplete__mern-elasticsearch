const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./types");
const { resolvers } = require("./resolvers");

module.exports = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
});

