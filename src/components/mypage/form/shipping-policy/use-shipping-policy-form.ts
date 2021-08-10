import {useMeSellerShippingPolicy} from '@src/common/hooks/apis';

export const useShippingPolicyForm = () => {
  const {data} = useMeSellerShippingPolicy();
  const shippingPolicy = data?.meSeller?.shippingPolicy;
  const fee = shippingPolicy?.fee || 0;
  const minimumAmountForFree = shippingPolicy?.minimumAmountForFree || 0;
  const defaultValue = {
    shippingPolicy: {
      fee,
      minimumAmountForFree,
    },
  };

  return {data, defaultValue};
};
