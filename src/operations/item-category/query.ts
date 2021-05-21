import gql from 'graphql-tag';

import {OperationType} from '../type';

export const ITEM_MAJOR_CATEGORIES_QUERY: OperationType = {
  gql: gql`
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
  `,
  dataName: 'itemMajorCategories',
};
