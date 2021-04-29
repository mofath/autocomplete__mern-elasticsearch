import gql from 'graphql-tag'

export const autocompleteQuery = gql`
  query AutocompleteQuery($text: String!) {
    autocomplete(text: $text) {
        id,
        name,
        image,  
        brand,
    }
  }
`;
