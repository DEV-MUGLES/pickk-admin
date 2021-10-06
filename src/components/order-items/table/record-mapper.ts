import {OrderItemDataType} from '@src/containers/order-items/hooks';

export const orderItemsRecordMapper = (record: OrderItemDataType) => {
  const {buyer, receiver} = record.order;
  return {
    ...record,
    buyerName: buyer?.name,
    buyerPhoneNumber: buyer?.phoneNumber,
    receiverReceiverName: receiver?.receiverName,
  };
};
