import {gql, useQuery} from '@apollo/client';

export const GET_ORDER_ITEMS = gql`
  query MeSellerOrderItems {
    meSellerOrderItems {
      id
      merchantUid
      orderMerchantUid
      paidAt
      status
      claimStatus
      itemName
      productVariantName
      quantity
      order {
        receiver {
          name
          phoneNumber
        }
        buyer {
          name
          phoneNumber
          email
        }
      }
    }
  }
`;

export const useMeSellerOrderItems = () => useQuery(GET_ORDER_ITEMS);
