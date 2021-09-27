import {gql, useQuery} from '@apollo/client';
import {
  Inquiry,
  Item,
  User,
  OrderItem,
  QueryMeSellerInquiryArgs,
} from '@pickk/common';

const GET_ME_SELLER_INQUIRY = gql`
  query meSellerInquiry($id: Int!) {
    meSellerInquiry(id: $id) {
      id
      sellerId
      type
      isAnswered
      isSecret
      title
      content
      createdAt
      item {
        id
        imageUrl
        name
      }
      user {
        id
        nickname
      }
      orderItemMerchantUid
      orderItem {
        id
        merchantUid
        productVariantName
        quantity
        order {
          buyer {
            id
            name
            phoneNumber
          }
        }
      }
    }
  }
`;

type InquiryDetailDataType = Pick<
  Inquiry,
  | 'id'
  | 'sellerId'
  | 'type'
  | 'isAnswered'
  | 'isSecret'
  | 'title'
  | 'content'
  | 'createdAt'
  | 'orderItemMerchantUid'
> & {
  item: Pick<Item, 'id' | 'imageUrl' | 'name'>;
  user: Pick<User, 'id' | 'nickname'>;
  orderItem: Pick<
    OrderItem,
    'id' | 'merchantUid' | 'productVariantName' | 'quantity'
  > & {
    order: {
      buyer: Pick<User, 'id' | 'name' | 'phoneNumber'>;
    };
  };
};

export const useInquiry = (id: number) => {
  const {data, loading} = useQuery<
    {meSellerInquiry: InquiryDetailDataType},
    QueryMeSellerInquiryArgs
  >(GET_ME_SELLER_INQUIRY, {
    variables: {
      id,
    },
  });

  return {data: data?.meSellerInquiry, loading};
};
