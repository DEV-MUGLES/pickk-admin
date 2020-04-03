import {OrderStatus} from './Order';

export type CancelRequest = {
  id: number;
  orderMerchantUid: string;
  orderStatus: OrderStatus;
  cancelStatus: CancelStatus;
  paidAt: Date;
  requestedAt: Date;
  confirmedAt: Date;
  reason: string;
  itemNames: string[];
  options: string[][];
  quantity: number;
  orderAddressName: string;
  orderAddressPhone: string;
  buyerName: string;
  buyerPhone: string;
};

export enum CancelStatus {
  CancelRequested = '취소 요청됨',
  CancelConfirmed = '취소 완료',
  CancelRejected = '취소 거부됨',
  CancelFailed = '취소 실패',
}

export type CancelRequestPreview = {
  requested: number;
  confirmed: number;
};
