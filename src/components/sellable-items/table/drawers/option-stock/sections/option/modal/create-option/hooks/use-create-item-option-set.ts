import {gql, useMutation} from '@apollo/client';
import {
  Mutation,
  MutationCreateMeSellerItemOptionSetArgs,
  CreateItemOptionInput,
} from '@pickk/common';

export const CREATE_ITEM_OPTION_SET = gql`
  mutation createMeSellerItemOptionSet(
    $id: Int!
    $input: CreateItemOptionSetInput!
  ) {
    createMeSellerItemOptionSet(id: $id, input: $input) {
      id
      options {
        id
        name
        values {
          id
          name
          priceVariant
        }
      }
      products {
        id
        isShipReserving
        itemOptionValues {
          id
          name
          priceVariant
        }
        stock
        stockThreshold
        createdAt
        updatedAt
      }
    }
  }
`;

export const useCreateItemOptionSet = () => {
  const [create] = useMutation<
    Pick<Mutation, 'createMeSellerItemOptionSet'>,
    MutationCreateMeSellerItemOptionSetArgs
  >(CREATE_ITEM_OPTION_SET);

  const createItemOptionSet = async (
    id: number,
    options: CreateItemOptionInput[],
  ) => {
    await create({
      variables: {
        id,
        input: {
          options,
        },
      },
    });
  };

  return {createItemOptionSet};
};
