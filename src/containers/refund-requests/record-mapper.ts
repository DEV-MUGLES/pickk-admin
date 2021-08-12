import {BaseRefundRequest} from '@src/common/graphql';

export const refundRequestRecordMapper = (record: BaseRefundRequest) => {
  const {buyer} = record.order;
  return {
    ...record,
    buyerName: buyer.name,
    buyerPhoneNumber: buyer.phoneNumber,
  };
};
