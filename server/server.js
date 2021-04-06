const elasticsearch = require("elasticsearch");
const { ApolloServer, gql } = require("apollo-server-express");
const typeDefs = require("./typeDefs")
const resolvers = require("./ressolvers")
const express = require("express")
const mongoose = require("mongoose")

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });

mongoose.connect("mongodb://localhost:27017/test3", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.listen({ port: 5000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);