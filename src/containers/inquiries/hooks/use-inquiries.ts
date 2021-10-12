import {gql, useQuery} from '@apollo/client';
import {Inquiry, Item, User, InquiryAnswer} from '@pickk/common';

const GET_INQUIRIES = gql`
  query meSellerInquiries($filter: InquiryFilter) {
    meSellerInquiries(filter: $filter) {
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
        phoneNumber
      }
      answers {
        id
        content
        displayAuthor
        createdAt
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
  user: Pick<User, 'id' | 'nickname' | 'phoneNumber'>;
  answers: Pick<
    InquiryAnswer,
    'id' | 'content' | 'displayAuthor' | 'createdAt'
  >[];
};

export const useInquiries = () => {
  return useQuery<{meSellerInquiries: InquiryDataType[]}>(GET_INQUIRIES);
};
