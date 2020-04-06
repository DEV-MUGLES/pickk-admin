import {OrderStatus} from './Order';

export type Settlement = {
  orderMerchantUid: string;
  merchantUid: string;
  productSku: string;
  paidAt: Date;
  status: OrderStatus;
  brandName: string;
  itemName: string;
  options: string[];
  quantity: number;
  buyerName: string;
  salePrice: number;
  reviewer: string;
  confirmedAt: Date;
  defaultSubsDiscountRate: number;
  appliedSubsDiscountRate: number;
  additionalSubsDiscountRate: number;
  originalPrice: number;
  shippingFee: number;
  subsDiscount: number;
  pointDiscount: number;
  totalPaidAmount: number;
  referenceAmount: number;
  expectedDate: Date;
};
