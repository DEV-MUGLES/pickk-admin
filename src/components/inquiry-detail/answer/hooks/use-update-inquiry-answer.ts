import {gql, useMutation} from '@apollo/client';
import {Mutation, MutationUpdateMeSellerInquiryAnswerArgs} from '@pickk/common';

const UPDATE_ME_SELLER_INQUIRY_ANSWER = gql`
  mutation updateMeSellerInquiryAnswer(
    $id: Int!
    $updateInquiryAnswerInput: UpdateInquiryAnswerInput!
  ) {
    updateMeSellerInquiryAnswer(
      id: $id
      updateInquiryAnswerInput: $updateInquiryAnswerInput
    ) {
      id
      content
      displayAuthor
      createdAt
    }
  }
`;

export const useUpdateInquiryAnswer = () => {
  const [update] = useMutation<
    Pick<Mutation, 'updateMeSellerInquiryAnswer'>,
    MutationUpdateMeSellerInquiryAnswerArgs
  >(UPDATE_ME_SELLER_INQUIRY_ANSWER);

  const updateInquiryAnswer = async (
    id: number,
    content: string,
    displayAuthor: string,
  ) => {
    await update({
      variables: {
        id,
        updateInquiryAnswerInput: {
          content,
          displayAuthor,
        },
      },
    });
  };

  return {updateInquiryAnswer};
};
