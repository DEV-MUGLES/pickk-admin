import {gql} from '@apollo/client';

export const PLACEHOLDER_MUTATION = gql`
  mutation UpdateMe {
    updateMe {
      id
    }
  }
`;

export const UPLOAD_MULTIPLE_IMAGES_MUTATION = gql`
  mutation UploadMultipleImages($uploadImageInput: UploadMultipleImageInput!) {
    uploadMultipleImages(uploadImageInput: $uploadImageInput)
  }
`;
