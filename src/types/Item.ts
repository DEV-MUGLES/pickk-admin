export type Item = {
  id: number;
  name: string;
  originalPrice: number;
  salePrice: number;
  skuPrefix: string;
  subsDiscountRate: number;
  reviewCount: number;
  purchasedCount: number;
  options: number[];
  isStockManaged: boolean;
  purchaseUrl: string;
};

export type ItemSubsDiscountRateInfo = {
  id?: number;
  discountRate: number;
  startAt: string;
  endAt: string;
  item?: number;
};
