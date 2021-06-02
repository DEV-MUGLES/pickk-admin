import {useMutation} from '@apollo/client';
import {message} from 'antd';

import BaseForm from '@src/components/organisms/Form/base';

import {UPDATEE_MY_SELLER_SETTLE_POLICY_MUTATION} from '@src/operations/sellers/mutation';

import {FORM_ITEMS} from './form-items';
import {useShippingPolicyForm} from './use-settle-policy-form';

function SettlePolicyForm() {
  const {defaultValue} = useShippingPolicyForm();
  const [updateSettlePolicy] = useMutation(
    UPDATEE_MY_SELLER_SETTLE_POLICY_MUTATION,
  );

  const handleSaveClick = (formInput) => {
    const {bankCode, number, ownerName} = formInput.accountInput;
    updateSettlePolicy({
      variables: {
        updateSellerSettlePolicyInput: {
          ...formInput,
          accountInput: {
            bankCode,
            number,
            ownerName,
          },
        },
      },
    })
      .then(() => {
        message.success('저장되었습니다.');
      })
      .catch(() => {
        message.error('저장에 실패했습니다');
      });
  };

  return (
    <BaseForm
      FORM_ITEMS={FORM_ITEMS}
      onSaveClick={handleSaveClick}
      defaultValue={defaultValue}
    />
  );
}

export default SettlePolicyForm;
