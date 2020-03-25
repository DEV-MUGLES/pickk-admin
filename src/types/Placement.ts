import {OrderStatus} from './Order';

export type PlacementPreview = {
  cancelledBeforeShippingCount: number;
  addressChangedCount: number;
  paidCount: number;
  placedCount: number;
};

export type Placement = {
  orderMerchantUid: string;
  orderItemMerchantUid: string;
  productSku: string;
  paidAt: Date;
  status: OrderStatus;
  brandName: string;
  itemName: string;
  optionw: string[];
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
