import {gql, useMutation} from '@apollo/client';
import {Mutation, MutationUploadMultipleImagesArgs} from '@pickk/common';

export const useUploadMultipleImages = () =>
  useMutation<
    Pick<Mutation, 'uploadMultipleImages'>,
    MutationUploadMultipleImagesArgs
  >(gql`
    mutation UploadMultipleImages(
      $uploadImageInput: UploadMultipleImageInput!
    ) {
      uploadMultipleImages(uploadImageInput: $uploadImageInput)
    }
  `);
