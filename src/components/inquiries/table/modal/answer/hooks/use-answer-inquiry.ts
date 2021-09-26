import {gql, useMutation} from '@apollo/client';
import {Mutation, MutationAnswerMeSellerInquiryArgs} from '@pickk/common';

const ANSWER_INQUIRY = gql`
  mutation answerMeSellerInquiry(
    $id: Int!
    $answerInquiryInput: AnswerInquiryInput!
  ) {
    answerMeSellerInquiry(id: $id, answerInquiryInput: $answerInquiryInput) {
      id
      answers {
        id
        content
        displayAuthor
      }
    }
  }
`;

export const useAnswerInquiry = () => {
  const [answer] = useMutation<
    Pick<Mutation, 'answerMeSellerInquiry'>,
    MutationAnswerMeSellerInquiryArgs
  >(ANSWER_INQUIRY);

  const answerInquiry = async (
    id: number,
    content: string,
    displayAuthor: string,
  ) => {
    await answer({
      variables: {
        id,
        answerInquiryInput: {
          content,
          displayAuthor,
        },
      },
    });
  };

  return {answerInquiry};
};
