import {gql} from '@apollo/client';

import {OperationType} from './type';

export const PLACEHOLDER_MUTATION: OperationType = {
  gql: gql`
    mutation UpdateMe {
      updateMe {
        id
      }
    }
  `,
  dataName: 'placeholderMutation',
};

export const UPLOAD_MULTIPLE_IMAGES_MUTATION: OperationType = {
  gql: gql`
    mutation UploadMultipleImages(
      $uploadImageInput: UploadMultipleImageInput!
    ) {
      uploadMultipleImages(uploadImageInput: $uploadImageInput)
    }
  `,
  dataName: 'uploadMultipleImages',
};
