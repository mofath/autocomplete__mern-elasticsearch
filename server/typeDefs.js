const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Product {
    _id: ID!
    name: String!
    brand: String!
    price: Float!
    image: String!
  }

  input ProductInput {
    name: String!
    brand: String!
    price: Float!
    image: String!
  }

  type Mutation {
    createProduct(productInput: ProductInput): Product!
  }

  type Query {
    hello: String!
    products: [Product!]!
    search(query: String!): [Product!]!
  }
`;

module.exports = typeDefs;
