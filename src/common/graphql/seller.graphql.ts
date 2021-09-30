import {gql} from '@apollo/client';

export const SELLER_SERVICE_CENTER_INFO_FRAGEMENT = gql`
  fragment SellerServiceCenterInfoFragment on Seller {
    id
    phoneNumber
    operationTimeMessage
    kakaoTalkCode
  }
`;

export const SELLER_SETTLE_POLICY_FRAGMENT = gql`
  fragment SellerSettlePolicyFragment on SellerSettlePolicy {
    id
    picName
    phoneNumber
    email
  }
`;
