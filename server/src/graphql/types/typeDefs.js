const { gql } = require("apollo-server-express");

const typeDefs = gql`

  type Category {
    id: Int!
    name: String!
  }

  type Autocomplete {
    name: String
    brand: String
    image: String
    id: ID!
  }

  input CategoryInput {
    id: Int!
    name: String!
  }

  input ProductInput {
    name: String!
    brand: String!
    price: Float!
    image: String!
    category: CategoryInput!
  }

  type Product {
    id: ID!
    name: String!
    brand: String!
    price: Float!
    image: String!
    category: Category!
  }

  type Mutation {
    createProduct(productInput: ProductInput): Product!
  }

  type Query {
    products( skip: Int = 0, limit: Int = 10 ): [Product!]!
    autocomplete(text: String!): [Autocomplete!]!
  }
`;

module.exports = typeDefs;
