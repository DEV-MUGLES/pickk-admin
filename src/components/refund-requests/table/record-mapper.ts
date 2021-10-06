import {RefundRequestDataType} from '@src/containers/refund-requests/hooks';

export const refundRequestRecordMapper = (record: RefundRequestDataType) => {
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
