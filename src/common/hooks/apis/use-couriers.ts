import {gql, useQuery} from '@apollo/client';
import {Query} from '@pickk/common';

export const useCouriers = () => {
  const {data} = useQuery<Pick<Query, 'couriers'>>(gql`
    query couriers {
      couriers {
        id
        name
      }
    }
  `);

  return {data: data?.couriers};
};
