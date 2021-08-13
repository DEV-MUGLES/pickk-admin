import {BaseOrderItem} from '@src/common/graphql';

import {orderItemsRecordMapper} from '../../order-items/table/record-mapper';

export const placementsRecordMapper = (record: BaseOrderItem) => {
  const {order, shipment} = record;
  const {buyer, receiver} = order;
  return {
    ...orderItemsRecordMapper(record),
    courierId: shipment.courierId,
    courierName: shipment.courier.name,
    courierCode: shipment.courier.code,
    trackCode: shipment.trackCode,
    buyerEmail: buyer.email,
    receiverPhoneNumber: receiver.phoneNumber,
    receiverPostalCode: receiver.postalCode,
    receiverBaseAddress: receiver.baseAddress,
    receiverDetailAddress: receiver.detailAddress,
    receiverFullAddress: receiver.baseAddress + receiver.detailAddress,
    receiverMessage: receiver.message,
  };
};
