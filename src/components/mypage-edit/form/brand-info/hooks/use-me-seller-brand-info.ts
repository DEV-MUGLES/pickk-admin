import {gql, useQuery} from '@apollo/client';
import {Brand, Seller} from '@pickk/common';

export const GET_SELLER_BRAND_INFO = gql`
  query MeSeller {
    meSeller {
      id
      brand {
        id
        imageUrl
        description
      }
    }
  }
`;

export type MeSellerBrandInfoData = Pick<Seller, 'id'> & {
  brand: Pick<Brand, 'id' | 'imageUrl' | 'description'>;
};

export const useMeSellerBrandInfo = () => {
  const {data} = useQuery<{meSeller: MeSellerBrandInfoData}>(
    GET_SELLER_BRAND_INFO,
  );

  return {data: data?.meSeller};
};
