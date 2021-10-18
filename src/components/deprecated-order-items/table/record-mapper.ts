import {OrderItemDataType} from '@containers/deprecated-order-items/hooks';

export const orderItemsRecordMapper = (record: OrderItemDataType) => {
  const {buyer, receiver} = record.order;
  return {
    ...record,
    buyerName: buyer?.name,
    buyerPhoneNumber: buyer?.phoneNumber,
    receiverReceiverName: receiver?.receiverName,
  };
};
