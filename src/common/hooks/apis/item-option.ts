import {gql, useMutation} from '@apollo/client';
import {Mutation, MutationUpdateItemOptionArgs} from '@pickk/common';

const ITEM_OPTION_FRAGMENT = gql`
  fragment ItemOptionFragment on ItemOption {
    id
    name
    values {
      id
      name
    }
  }
`;

export const useUpdateItemOption = () =>
  useMutation<
    Pick<Mutation, 'updateItemOption'>,
    MutationUpdateItemOptionArgs
  >(gql`
    mutation UpdateItemOption(
      $id: Int!
      $updateItemOptionInput: UpdateItemOptionInput!
    ) {
      updateItemOption(id: $id, updateItemOptionInput: $updateItemOptionInput) {
        ...ItemOptionFragment
      }
    }
    ${ITEM_OPTION_FRAGMENT}
  `);
