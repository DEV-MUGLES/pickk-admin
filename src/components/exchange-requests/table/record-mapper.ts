import {BaseExchangeRequest} from '@src/common/graphql';

export const exchangeRequestRecordMapper = (record: BaseExchangeRequest) => {
  const {orderItem, reshipment} = record;
  const {buyer, receiver} = orderItem.order;
  return {
    ...record,
    merchantUid: record.orderItemMerchantUid,
    orderMerchantUid: orderItem.orderMerchantUid,
    itemName: orderItem.itemName,
    productVariantName: orderItem.productVariantName,
    quantity: orderItem.quantity,
    buyerName: buyer.name,
    buyerPhoneNumber: buyer.phoneNumber,
    receiverName: receiver.name,
    receiverPhoneNumber: receiver.phoneNumber,
    reshipmentCourierId: reshipment.courierId,
    reshipmentCourierName: reshipment.courier.name,
    reshipmentTrackCode: reshipment.trackCode,
    receiverPostalCode: receiver.postalCode,
    receiverBaseAddress: receiver.baseAddress,
    receiverDetailAddress: receiver.detailAddress,
    receiverFullAddress: `${receiver.baseAddress} ${receiver.detailAddress}`,
    itemFinalPrice: orderItem.itemFinalPrice,
    recommenderNickname: orderItem.recommenderNickname,
  };
};
