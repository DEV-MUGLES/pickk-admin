import {gql, useQuery} from '@apollo/client';
import {Seller, SellerSaleStrategy} from '@pickk/common';

const GET_SELLER_PICKK_DISCOUNT_RATE = gql`
  query meSeller {
    meSeller {
      id
      saleStrategy {
        id
        pickkDiscountRate
      }
    }
  }
`;

export const usePickkDiscountRate = () => {
  const {data} = useQuery<{
    meSeller: Pick<Seller, 'id'> & {
      saleStrategy: Pick<SellerSaleStrategy, 'id' | 'pickkDiscountRate'>;
    };
  }>(GET_SELLER_PICKK_DISCOUNT_RATE);
  return {data: data?.meSeller.saleStrategy.pickkDiscountRate};
};
