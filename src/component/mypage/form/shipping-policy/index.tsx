import {message} from 'antd';

import BaseForm from '../../../../components/common/organisms/Form/base';

import {useShippingPolicyForm} from './use-shipping-policy-form';
import {useUpdateMySellerShippingPolicy} from '@src/hooks/apis';

import {FORM_ITEMS} from './form-items';

function ShippingPolicyForm() {
  const {defaultValue} = useShippingPolicyForm();
  const [updateShippingPolicy] = useUpdateMySellerShippingPolicy();

  const handleSaveClick = async (formInput) => {
    try {
      const {shippingPolicy} = formInput;
      updateShippingPolicy({
        variables: {
          updateSellerShippingPolicyInput: shippingPolicy,
        },
      });
      message.success('저장되었습니다.');
    } catch {
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

export default ShippingPolicyForm;
