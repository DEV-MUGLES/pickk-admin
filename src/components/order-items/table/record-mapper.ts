import {BaseOrderItem} from '@src/common/graphql';

export const orderItemsRecordMapper = (record: BaseOrderItem) => {
  const {buyer, receiver} = record.order;
  return {
    ...record,
    buyerName: buyer?.name,
    buyerPhoneNumber: buyer?.phoneNumber,
    receiverName: receiver?.name,
  };
};
