import {BaseOrderItem} from '@src/common/graphql';

import {orderItemsRecordMapper} from '../order-items/record-mapper';

export const placementsRecordMapper = (record: BaseOrderItem) => {
  const {buyer, receiver} = record.order;
  return {
    ...orderItemsRecordMapper(record),
    orderBuyerEmail: buyer.email,
    orderReceiverPhoneNumber: receiver.phoneNumber,
    orderReceiverPostalCode: receiver.postalCode,
    orderReceiverBaseAddress: receiver.baseAddress,
    orderReceiverDetailAddress: receiver.detailAddress,
    orderReceiverFullAddress: receiver.baseAddress + receiver.detailAddress,
  };
};
