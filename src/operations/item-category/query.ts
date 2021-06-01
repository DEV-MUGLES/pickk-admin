import gql from 'graphql-tag';

export const ITEM_MAJOR_CATEGORIES_QUERY = gql`
  query ItemMajorCategories {
    itemMajorCategories {
      id
      name
      children {
        id
        name
      }
    }
  }
`;
