import {gql, useMutation} from '@apollo/client';

const UPDATE_ROOT_INQUIRY_ANSWER = gql`
  mutation updateRootInquiryAnswer(
    $id: Int!
    $updateInquiryAnswerInput: UpdateInquiryAnswerInput!
  ) {
    updateRootInquiryAnswer(id:$id, updateInquiryAnswerInput:$updateInquiryAnswerInput:) {
      id
      content
      displayAuthor
      updatedAt
    }
  }
`;

export const useUpdateInquiryAnswer = () => {
  const [update] = useMutation(UPDATE_ROOT_INQUIRY_ANSWER);

  const updateInquiryAnswer = async (id, content, displayAuthor) => {
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
