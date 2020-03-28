import {OrderStatus, ClaimStatus} from './Order';

export type PlacementPreview = {
  cancelledBeforeShippingCount: number;
  addressChangedCount: number;
  paidCount: number;
  placedCount: number;
};

export type Placement = {
  orderMerchantUid: string;
  merchantUid: string;
  productSku: string;
  paidAt: Date;
  status: OrderStatus | ClaimStatus;
  brandName: string;
  itemName: string;
  options: string[];
  quantity: number;
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
  addressName: string;
  addressPhone: string;
  addressPostCode: string;
  baseAddress: string;
  detailAddress: string;
  addressMessage: string;
  salePrice: number;
  reviewer: string;
  subDiscountRate: number;
  courier: string;
  trackingCode: string;
  toAddress: string;
  trackingViewUrl: string;
  postCode: string;
};
