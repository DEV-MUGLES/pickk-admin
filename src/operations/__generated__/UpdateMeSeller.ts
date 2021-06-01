/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateSellerInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateMeSeller
// ====================================================

export interface UpdateMeSeller_updateMeSeller {
  __typename: "Seller";
  id: number;
}

export interface UpdateMeSeller {
  updateMeSeller: UpdateMeSeller_updateMeSeller;
}

export interface UpdateMeSellerVariables {
  updateSellerInput: UpdateSellerInput;
}
