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
};
