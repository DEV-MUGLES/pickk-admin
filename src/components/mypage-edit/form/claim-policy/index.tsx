import {message} from 'antd';

import BaseForm from '../../../common/organisms/Form/base';

import {isEqualObject} from '@src/common/helpers';

import {
  useClaimPolicyForm,
  useUpdateMySellerClaimPolicy,
  useUpdateMySellerReturnAddress,
} from './hooks';
import {AddressType} from './address-input';

import {FORM_ITEMS} from './form-items';

function ClaimPolicyForm() {
  const {defaultValue} = useClaimPolicyForm();
  const [updateMySellerReturnAddress] = useUpdateMySellerReturnAddress();
  const [updateMySellerClaimPolicy] = useUpdateMySellerClaimPolicy();

  const handleSaveReturnAddress = async (returnAddress: AddressType) => {
    if (isEqualObject(defaultValue?.returnAddress, returnAddress)) {
      return;
    }

    await updateMySellerReturnAddress({
      variables: {
        updateSellerReturnAddressInput: returnAddress,
      },
    });
  };

  const handleSaveClick = async (formValues) => {
    try {
      const {returnAddress, ...updateSellerClaimPolicyInput} = formValues;
      await handleSaveReturnAddress(returnAddress);

      await updateMySellerClaimPolicy({
        variables: {
          updateSellerClaimPolicyInput: {
            ...updateSellerClaimPolicyInput,
          },
        },
      });
      message.success('저장되었습니다.');
    } catch (error) {
      message.error('저장에 실패했습니다. err - ' + error);
    }
  };

  return (
    <BaseForm
      FORM_ITEMS={FORM_ITEMS}
      onSaveClick={handleSaveClick}
      defaultValue={{...defaultValue}}
    />
  );
}

export default ClaimPolicyForm;
