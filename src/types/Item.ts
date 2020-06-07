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

export type ItemOptionsResponse = {
  options: {
    values: {
      [valueName: string]: string[];
    };
    isSoldout: number[][];
    optionPriceVariants: PriceVariant[];
  };
  products: {
    [productName: string]: Product;
  };
};

export type Product = {
  priceVariant: number;
  values: string[];
};

export type PriceVariant = {
  option: number[];
  price: number;
};

export type ItemOption = {
  [optionName: string]: string;
};
