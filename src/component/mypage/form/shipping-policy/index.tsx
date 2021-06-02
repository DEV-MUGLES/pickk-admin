import {message} from 'antd';
import {useMutation} from '@apollo/client';

import BaseForm from '../../../../components/organisms/Form/base';

import {useShippingPolicyForm} from './use-shipping-policy-form';
import {UPDATE_MY_SELLER_SHIPPING_POLICY_MUTATION} from '@src/operations/sellers/mutation';

import {FORM_ITEMS} from './form-items';

function ShippingPolicyForm() {
  const {defaultValue} = useShippingPolicyForm();
  const [updateShippingPolicy] = useMutation(
    UPDATE_MY_SELLER_SHIPPING_POLICY_MUTATION,
  );

  const handleSaveClick = async (formInput) => {
    try {
      const {shippingPolicy: updateSellerShippingPolicyInput} = formInput;
      updateShippingPolicy({
        variables: {
          updateSellerShippingPolicyInput,
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
