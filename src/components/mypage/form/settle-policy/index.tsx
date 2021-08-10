import {message} from 'antd';

import BaseForm from '@src/components/common/organisms/Form/base';

import {useSettlePolicyForm} from './use-settle-policy-form';
import {useUpdateMySellerSettlePolicy} from '@src/hooks/apis';

import {FORM_ITEMS} from './form-items';

function SettlePolicyForm() {
  const {defaultValue} = useSettlePolicyForm();
  const [updateSettlePolicy] = useUpdateMySellerSettlePolicy();

  const handleSaveClick = async (formInput) => {
    try {
      const {bankCode, number, ownerName} = formInput.accountInput;
      await updateSettlePolicy({
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
      });
      message.success('저장되었습니다.');
    } catch (error) {
      message.error('저장에 실패했습니다');
    }
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
