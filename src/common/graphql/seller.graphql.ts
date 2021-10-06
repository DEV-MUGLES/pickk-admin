import {gql} from '@apollo/client';

export const SELLER_SETTLE_POLICY_FRAGMENT = gql`
  fragment SellerSettlePolicyFragment on SellerSettlePolicy {
    id
    picName
    phoneNumber
    email
  }
`;
