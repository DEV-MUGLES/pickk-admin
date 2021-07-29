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
