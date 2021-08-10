import {gql, useMutation} from '@apollo/client';
import {
  Mutation,
  MutationCreateItemOptionSetArgs,
  MutationUpdateItemOptionArgs,
} from '@pickk/common';

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

const PRODUCT_FRAGMENT = gql`
  fragment ProductFragment on Product {
    id
    isShipReserving
    itemOptionValues {
      id
      name
    }
    stock
    stockThreshold
    createdAt
    updatedAt
  }
`;

export const useCreateItemOptionSet = () =>
  useMutation<
    Pick<Mutation, 'createItemOptionSet'>,
    MutationCreateItemOptionSetArgs
  >(gql`
    mutation CreateOptionSet(
      $id: Int!
      $createItemOptionSetInput: CreateItemOptionSetInput!
    ) {
      createItemOptionSet(
        id: $id
        createItemOptionSetInput: $createItemOptionSetInput
      ) {
        id
        options {
          ...ItemOptionFragment
        }
        products {
          ...ProductFragment
        }
      }
    }
    ${ITEM_OPTION_FRAGMENT}
    ${PRODUCT_FRAGMENT}
  `);

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
