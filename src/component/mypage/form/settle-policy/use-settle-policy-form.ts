import {useMeSellerSettlePolicy} from '@src/hooks/apis';

export const useSettlePolicyForm = () => {
  const {data} = useMeSellerSettlePolicy();

  const defaultValue = {
    ...data?.meSeller?.settlePolicy,
    accountInput: data?.meSeller?.settlePolicy?.account,
  };

  return {data, defaultValue};
};
