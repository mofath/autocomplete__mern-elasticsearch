import gql from 'graphql-tag'

export const productsQuery = gql`
  query ProductsQuery {
    products {
        id,
        name,
        image,
        brand,
        price,
        category{
          id
          name
        }
    }
  }
`;
