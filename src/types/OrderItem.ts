import {OrderStatus, ClaimStatus} from './Order';

export type OrderItemShip = {
  id: number;
  merchantUid: string;
  courier: string;
  trackingCode: string;
};

export type OrderItem = {
  id: number;
  orderMerchantUid: string;
  merchantUid: string;
  productSku: string;
  paidAt: Date;
  status: OrderStatus | ClaimStatus;
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
};
