import {gql, useMutation} from '@apollo/client';

const UPDATE_ORDER_ITEM_TRACK_CODE = gql`
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
  const [_updateOrderItemTrackCode] = useMutation(UPDATE_ORDER_ITEM_TRACK_CODE);

  const updateOrderItemTrackCode = async (
    merchantUid: string,
    trackCode: string,
  ) => {
    await _updateOrderItemTrackCode({
      variables: {
        merchantUid,
        trackCode,
      },
    });
  };

  return {updateOrderItemTrackCode};
};
