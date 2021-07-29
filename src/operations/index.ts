import {gql} from '@apollo/client';

export const PLACEHOLDER_MUTATION = gql`
  mutation UpdateMe {
    updateMe {
      id
    }
  }
`;
