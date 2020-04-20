import {OrderStatus} from './Order';

export type Settlement = {
  orderMerchantUid: string;
  merchantUid: string;
  productSku: string;
  paidAt: Date;
  status: OrderStatus;
  settleStatus: SettleStatus;
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

export enum SettleStatus {
  Confirmed = '정산 완료',
  Issued = '정산 이슈',
  Pending = '미정산',
}

export type SettlementAmountPreview = {
  confirmedAmountThisMonth: number;
  issuedAmount: number;
  confirmedAmountNextMonth: number;
};

export type SettlementCountPreview = {
  confirmedCount: number;
  issuedCount: number;
  pendingCount: number;
};
