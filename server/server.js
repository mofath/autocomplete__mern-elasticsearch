const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./typeDefs");
const resolvers = require("./ressolvers");
const { getEsClient } = require("./es-client");

const app = express();
const esClient = getEsClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, esClient }),
});

app.use("/images", express.static(path.join(__dirname, "../images")));

server.applyMiddleware({ app });

mongoose.connect("mongodb://localhost:27017/test3", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.listen({ port: 5000 }, () =>
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
);
