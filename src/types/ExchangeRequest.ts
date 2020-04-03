import {OrderStatus, PickingStatus} from '.';

export type ExchangeRequest = {
  id: number;
  orderMerchantUid: string;
  merchantUid: string;
  orderStatus: OrderStatus;
  exchangeStatus: ExchangeStatus | PickingStatus;
  reshipStatus: PickingStatus;
  paidAt: Date;
  requestedAt: Date;
  confirmedAt: Date;
  reason: string;
  exchangeCourier: string;
  exchangeTrackingCode: string;
  exchangeTrackingViewUrl: string;
  reshipCourier: string;
  reshipTrackingCode: string;
  reshipTrackingViewUrl: string;
  itemName: string;
  options: string[];
  productSku: string;
  exchangeOptions: string[];
  exchangeProductSku: string;
  quantity: number;
  addressName: string;
  addressPhone: string;
  buyerName: string;
  buyerPhone: string;
};

export enum ExchangeStatus {
  ExchangeRequested = '교환 요청됨',
  ExchangeConfirmed = '교환 완료',
  ExchangeRejected = '교환 거부됨',
  ExchangeCanceld = '교환 요청 취소',
}

export type ExchangeRequestPreview = {
  requested: number;
  picked: number;
  confirmed: number;
};
