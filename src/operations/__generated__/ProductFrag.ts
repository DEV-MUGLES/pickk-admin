/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductFrag
// ====================================================

export interface ProductFrag_itemOptionValues {
  __typename: "ItemOptionValue";
  id: number;
  name: string;
}

export interface ProductFrag_shippingReservePolicy {
  __typename: "ProductShippingReservePolicy";
  createdAt: any;
  /**
   * 예약발송 예정일
   */
  estimatedShippingBegginDate: any;
  id: number;
  /**
   * 예약설정된 재고. 예약발송일이 되면, 예약발송 상태는 자동으로 종료되며, 잔여 예약발송 재고는 일반 재고에 합산됩니다.
   */
  stock: number;
  updatedAt: any;
}

export interface ProductFrag {
  __typename: "Product";
  createdAt: any;
  id: number;
  itemOptionValues: ProductFrag_itemOptionValues[];
  shippingReservePolicy: ProductFrag_shippingReservePolicy | null;
  stock: number;
  updatedAt: any;
}
