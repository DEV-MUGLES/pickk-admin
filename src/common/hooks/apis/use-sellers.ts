import {gql, useQuery} from '@apollo/client';

export const useSellers = () => {
  const {data} = useQuery<{
    sellers: {id: number; brand: {nameKor: string}}[];
  }>(gql`
    query sellers {
      sellers {
        id
        brand {
          nameKor
        }
      }
    }
  `);

  return {data: data?.sellers};
};
