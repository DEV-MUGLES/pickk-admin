import {gql, useQuery} from '@apollo/client';
import {Seller} from '@pickk/common';

export const SELLER_BASE_INFO_FRAGMENT = gql`
  fragment SellerBaseInfoFragment on Seller {
    id
    businessName
    representativeName
    businessCode
    mailOrderBusinessCode
    email
    orderNotiPhoneNumber
    csNotiPhoneNumber
  }
`;

export type MeSellerBaseInfoData = Pick<
  Seller,
  | 'id'
  | 'businessName'
  | 'representativeName'
  | 'businessCode'
  | 'mailOrderBusinessCode'
  | 'email'
  | 'orderNotiPhoneNumber'
  | 'csNotiPhoneNumber'
>;

export const useMeSellerBaseInfo = () =>
  useQuery<{meSeller: MeSellerBaseInfoData}>(gql`
    query MeSeller {
      meSeller {
        ...SellerBaseInfoFragment
      }
    }
    ${SELLER_BASE_INFO_FRAGMENT}
  `);
