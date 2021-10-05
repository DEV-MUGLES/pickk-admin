import {OrderClaimFaultOf} from '@pickk/common';

export const getOrderClaimFaultOfDisplayName = (faultOf: OrderClaimFaultOf) => {
  if (!faultOf) {
    return '';
  }

  const {Customer, Seller} = OrderClaimFaultOf;

  return {
    [Customer]: '구매자',
    [Seller]: '판매자',
  }[faultOf];
};
