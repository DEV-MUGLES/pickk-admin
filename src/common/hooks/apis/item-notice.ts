import {gql, useMutation, ApolloCache, MutationUpdaterFn} from '@apollo/client';
import {Mutation, MutationAddItemNoticeArgs} from '@pickk/common';

const ITEM_NOTICE_FRAGMENT = gql`
  fragment ItemNoticeFragment on ItemNotice {
    id
    type
    message
    startAt
    endAt
  }
`;

export const useAddItemNotice = () => {
  const [addItemNotice] = useMutation<
    Pick<Mutation, 'addItemNotice'>,
    MutationAddItemNoticeArgs
  >(gql`
    mutation AddItemNotice(
      $itemId: Int!
      $addItemNoticeInput: AddItemNoticeInput!
    ) {
      addItemNotice(itemId: $itemId, addItemNoticeInput: $addItemNoticeInput) {
        ...ItemNoticeFragment
      }
    }
    ${ITEM_NOTICE_FRAGMENT}
  `);

  const updateCache =
    (itemId: number): MutationUpdaterFn =>
    (cache: ApolloCache<unknown>, {data: {addItemNotice}}) => {
      cache.modify({
        id: `Item:${itemId}`,
        fields: {
          notice() {
            const newNoticeRef = cache.writeFragment({
              data: addItemNotice,
              fragment: ITEM_NOTICE_FRAGMENT,
            });

            return newNoticeRef;
          },
        },
      });
    };

  return {addItemNotice, updateCache};
};

export const useUpdateItemNotice = () =>
  useMutation(gql`
    mutation UpdateItemNotice(
      $itemId: Int!
      $updateItemNoticeInput: UpdateItemNoticeInput!
    ) {
      updateItemNotice(
        itemId: $itemId
        updateItemNoticeInput: $updateItemNoticeInput
      ) {
        ...ItemNoticeFragment
      }
    }
    ${ITEM_NOTICE_FRAGMENT}
  `);

export const useRemoveItemNotice = () =>
  useMutation(gql`
    mutation RemoveItemNotice($itemId: Int!) {
      removeItemNotice(itemId: $itemId) {
        id
        notice {
          id
        }
      }
    }
  `);
