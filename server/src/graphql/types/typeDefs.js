const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Product {
    id: ID!
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
    products( skip: Int = 0, limit: Int = 10 ): [Product!]!
    search(query: String!): [Product!]!
  }
`;

module.exports = typeDefs;
