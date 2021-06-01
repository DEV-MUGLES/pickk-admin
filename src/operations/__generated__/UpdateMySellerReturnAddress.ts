/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateSellerReturnAddressInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateMySellerReturnAddress
// ====================================================

export interface UpdateMySellerReturnAddress_updateMySellerReturnAddress {
  __typename: "SellerReturnAddress";
  id: number;
}

export interface UpdateMySellerReturnAddress {
  updateMySellerReturnAddress: UpdateMySellerReturnAddress_updateMySellerReturnAddress;
}

export interface UpdateMySellerReturnAddressVariables {
  updateSellerReturnAddressInput: UpdateSellerReturnAddressInput;
}
