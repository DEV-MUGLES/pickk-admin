import {gql, useQuery} from '@apollo/client';
import {InquiryAnswer, QueryMeSellerInquiryArgs} from '@pickk/common';

const GET_INQUIRY_ANSWERS = gql`
  query meSellerInquiry($id: Int!) {
    meSellerInquiry(id: $id) {
      id
      answers {
        id
        content
        displayAuthor
        createdAt
        updatedAt
      }
    }
  }
`;

type InquiryAnswerDataType = Pick<
  InquiryAnswer,
  'id' | 'content' | 'displayAuthor' | 'createdAt' | 'updatedAt'
>;

export const useInquiryAnswers = (id: number) => {
  const {data, refetch} = useQuery<
    {
      meSellerInquiry: {
        id: number;
        answers: InquiryAnswerDataType[];
      };
    },
    QueryMeSellerInquiryArgs
  >(GET_INQUIRY_ANSWERS, {
    variables: {
      id,
    },
  });

  return {data: data?.meSellerInquiry.answers, refetch};
};
