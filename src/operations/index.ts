import {gql} from '@apollo/client';

import {OperationType} from './type';

export const PLACEHOLDER_MUTATION: OperationType = {
  gql: gql`
    mutation {
      _
    }
  `,
  dataName: 'placeholderMutation',
};
