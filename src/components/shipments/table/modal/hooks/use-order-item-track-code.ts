import {gql, useMutation} from '@apollo/client';

const UPDATE_ME_SELLER_ORDER_ITEM_TRACK_CODE = gql`
  mutation updateMeSellerOrderItemTrackCode(
    $merchantUid: String!
    $trackCode: String!
  ) {
    updateMeSellerOrderItemTrackCode(
      merchantUid: $merchantUid
      trackCode: $trackCode
    ) {
      id
      merchantUid
      shipment {
        id
        trackCode
      }
    }
  }
`;

export const useUpdateOrderItemTrackCode = () => {
  const [updateMeSellerOrderItemTrackCode] = useMutation(
    UPDATE_ME_SELLER_ORDER_ITEM_TRACK_CODE,
  );

  const updateOrderItemTrackCode = async (
    merchantUid: string,
    trackCode: string,
  ) => {
    await updateMeSellerOrderItemTrackCode({
      variables: {
        merchantUid,
        trackCode,
      },
    });
  };

  return {updateOrderItemTrackCode};
};
