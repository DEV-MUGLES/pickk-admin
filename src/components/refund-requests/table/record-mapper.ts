import {BaseRefundRequest} from '@src/common/graphql';

export const refundRequestRecordMapper = (record: BaseRefundRequest) => {
  const {order, shipment} = record;
  const {buyer} = order;
  return {
    ...record,
    id: record.merchantUid,
    buyerName: buyer?.name,
    buyerPhoneNumber: buyer?.phoneNumber,
    courierCode: shipment?.courier.code,
    trackCode: shipment?.trackCode,
  };
};
