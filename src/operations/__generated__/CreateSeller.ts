/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateSellerInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateSeller
// ====================================================

export interface CreateSeller_createSeller {
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

export interface CreateSeller {
  createSeller: CreateSeller_createSeller;
}

export interface CreateSellerVariables {
  createSellerInput: CreateSellerInput;
}
