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
  businessCode: string;
  businessName: string;
  email: string;
  kakaoTalkCode: string | null;
  mailOrderBusinessCode: string;
  operationTimeMessage: string;
  phoneNumber: string;
  representativeName: string;
  createdAt: any;
  updatedAt: any;
  orderNotiPhoneNumber: string | null;
  csNotiPhoneNumber: string | null;
}

export interface UpdateMeSeller {
  updateMeSeller: UpdateMeSeller_updateMeSeller;
}

export interface UpdateMeSellerVariables {
  updateSellerInput: UpdateSellerInput;
}
