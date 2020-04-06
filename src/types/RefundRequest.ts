import {OrderStatus} from './Order';

export type RefundRequest = {
  id: number;
  orderMerchantUid: string;
  orderStatus: OrderStatus;
  refundStatus: RefundStatus | PickingStatus;
  paidAt: Date;
  requestedAt: Date;
  pickUpStartedAt: Date;
  confirmedAt: Date;
  reason: string;
  refundAmount: number;
  subtractedShippingFee: number;
  courier: string;
  trackingCode: string;
  trackingViewUrl: string;
  itemNames: string[];
  options: string[][];
  quantity: number;
  orderAddressName: string;
  orderAddressPhone: string;
  buyerName: string;
  buyerPhone: string;
};

export enum RefundStatus {
  RefundRequested = '반품 요청됨',
  RefundConfirmed = '반품 완료',
  RefundRejected = '반품 거부됨',
  RefundCanceld = '반품 요청 취소',
  RefundFailed = '반품 요청 실패',
}

export enum PickingStatus {
  Picking = '상품 수거중',
  Picked = '상품 수거 완료',
}

export type RefundRequestPreview = {
  requested: number;
  picking: number;
  picked: number;
  confirmed: number;
};
