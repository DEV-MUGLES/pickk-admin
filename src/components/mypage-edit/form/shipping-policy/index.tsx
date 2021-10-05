import {message} from 'antd';
import {UpdateSellerShippingPolicyInput} from '@pickk/common';

import BaseForm from '../../../common/organisms/Form/base';

import {useShippingPolicyForm, useUpdateMySellerShippingPolicy} from './hooks';

import {FORM_ITEMS} from './form-items';

function ShippingPolicyForm() {
  const {data: defaultValue} = useShippingPolicyForm();
  const [updateShippingPolicy] = useUpdateMySellerShippingPolicy();

  const handleSaveClick = async (formInput: {
    shippingPolicy: Pick<
      UpdateSellerShippingPolicyInput,
      'fee' | 'minimumAmountForFree'
    >;
    description: string;
  }) => {
    try {
      const {shippingPolicy, description} = formInput;
      await updateShippingPolicy({
        variables: {
          updateSellerShippingPolicyInput: {
            ...shippingPolicy,
            description,
          },
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
      defaultValue={{
        shippingPolicy: {...defaultValue.shippingPolicy},
        description: defaultValue.shippingPolicy.description,
      }}
    />
  );
}

export default ShippingPolicyForm;
