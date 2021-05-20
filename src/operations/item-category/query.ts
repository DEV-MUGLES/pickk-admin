import gql from 'graphql-tag';

import {OperationType} from '../type';

export const ITEM_CATEGORY_TREE_QUERY: OperationType = {
  gql: gql`
    query ItemCategoryTree {
      itemCategoryTree {
        children {
          id
          name
          children {
            id
            name
          }
        }
        id
      }
    }
  `,
  dataName: 'itemCategoryTree',
};
