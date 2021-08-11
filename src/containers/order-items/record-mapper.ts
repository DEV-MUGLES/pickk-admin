import {BaseOrderItem} from '@src/common/graphql';

export const orderItemsRecordMapper = (record: BaseOrderItem) => {
  return {
    ...record,
    orderBuyerName: record.order.buyer.name,
    orderBuyerPhoneNumber: record.order.buyer.phoneNumber,
    orderReceiverName: record.order.receiver.name,
  };
};
