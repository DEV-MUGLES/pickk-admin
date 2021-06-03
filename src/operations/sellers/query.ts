import {gql} from '@apollo/client';

import {SELLER_FRAG} from './fragment';

export const ME_SELLER_QUERY = gql`
  ${SELLER_FRAG}
  query MeSeller {
    meSeller {
      ...SellerFrag
    }
  }
`;

export const SELLER_QUERY = gql`
  ${SELLER_FRAG}
  query Seller($id: Int!) {
    seller(id: $id) {
      ...SellerFrag
    }
  }
`;

export const SELLERS_QUERY = gql`
  ${SELLER_FRAG}
  query Sellers($pageInput: PageInput, $sellerFilter: SellerFilter) {
    sellers(pageInput: $pageInput, sellerFilter: $sellerFilter) {
      ...SellerFrag
    }
  }
`;
