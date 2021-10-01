import {message} from 'antd';

import BaseForm from '../../../common/organisms/Form/base';

import {useShippingPolicyForm, useUpdateMySellerShippingPolicy} from './hooks';

import {FORM_ITEMS} from './form-items';

function ShippingPolicyForm() {
  const {defaultValue} = useShippingPolicyForm();
  const [updateShippingPolicy] = useUpdateMySellerShippingPolicy();

  const handleSaveClick = async (formInput) => {
    try {
      const {shippingPolicy} = formInput;
      await updateShippingPolicy({
        variables: {
          updateSellerShippingPolicyInput: shippingPolicy,
        },
      });
      message.success('저장되었습니다.');
    } catch (err) {
      message.error('저장에 실패했습니다. err - ' + err);
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
