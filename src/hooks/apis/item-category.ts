import {gql, useQuery} from '@apollo/client';
import {Query} from '@pickk/common';

export const useItemMajorCategories = () =>
  useQuery<Pick<Query, 'itemMajorCategories'>>(gql`
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
  `);
