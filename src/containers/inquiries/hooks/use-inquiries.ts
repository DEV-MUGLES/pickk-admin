import {gql, useQuery} from '@apollo/client';
import {Inquiry, Item, User, InquiryAnswer} from '@pickk/common';

const GET_INQUIRIES = gql`
  query meSellerInquiries {
    meSellerInquiries {
      id
      title
      content
      type
      isAnswered
      isSecret
      orderItemMerchantUid
      createdAt
      item {
        id
        name
        imageUrl
      }
      user {
        id
        nickname
      }
      answers {
        id
        content
        displayAuthor
      }
    }
  }
`;

export type InquiryDataType = Pick<
  Inquiry,
  | 'id'
  | 'title'
  | 'content'
  | 'type'
  | 'isAnswered'
  | 'isSecret'
  | 'orderItemMerchantUid'
  | 'createdAt'
> & {
  item: Pick<Item, 'id' | 'name' | 'imageUrl'>;
  user: Pick<User, 'id' | 'nickname'>;
  answers: Pick<InquiryAnswer, 'id' | 'content' | 'displayAuthor'>;
};

export const useInquiries = () => {
  return useQuery<{meSellerInquiries: InquiryDataType[]}>(GET_INQUIRIES);
};
