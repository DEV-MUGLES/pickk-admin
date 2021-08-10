import {gql, useQuery} from '@apollo/client';
import {Query} from '@pickk/common';

import {SELLER_SERVICE_CENTER_INFO_FRAGEMENT} from '@src/common/graphql';

export const useMeSellerServiceCenterInfo = () =>
  useQuery<Pick<Query, 'meSeller'>>(gql`
    query MeSeller {
      meSeller {
        ...SellerServiceCenterInfoFragment
      }
    }
    ${SELLER_SERVICE_CENTER_INFO_FRAGEMENT}
  `);
