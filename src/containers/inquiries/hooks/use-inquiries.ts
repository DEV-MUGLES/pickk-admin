import {gql, useQuery} from '@apollo/client';
import {
  Inquiry,
  Item,
  User,
  InquiryAnswer,
  InquiryFilter,
  QueryMeSellerInquiriesArgs,
} from '@pickk/common';

import {BoardDataFetcher} from '@components/new-common/template/board';

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

export const flattenInquiryRecord = (record: InquiryDataType) => {
  const {user, item} = record;
  return {
    ...record,
    itemImageUrl: item.imageUrl,
    itemName: item.name,
    userNickname: user.nickname,
    userPhoneNumber: user.phoneNumber,
  };
};

export type FlattenInquiryDataType = ReturnType<typeof flattenInquiryRecord>;

/** @TODO search로 변경시 없어질 임시 훅 */
const useInquiriesCount = ({filter}: {filter: InquiryFilter}) => {
  const {data} = useQuery(
    gql`
      query meSellerInquiries($filter: InquiryFilter) {
        meSellerInquiries(filter: $filter) {
          id
        }
      }
    `,
    {
      variables: {
        filter,
      },
    },
  );
  return (data?.meSellerInquiries || []).length;
};

export const useInquiries: BoardDataFetcher<
  FlattenInquiryDataType,
  InquiryFilter
> = ({filter, pageInput}) => {
  const {data, loading, refetch} = useQuery<
    {meSellerInquiries: InquiryDataType[]},
    QueryMeSellerInquiriesArgs
  >(GET_INQUIRIES, {
    variables: {
      filter,
      pageInput,
    },
  });
  const total = useInquiriesCount({filter});

  return {
    data: data?.meSellerInquiries.map(flattenInquiryRecord),
    total,
    loading,
    refetch,
  };
};
