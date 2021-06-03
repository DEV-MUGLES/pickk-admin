import {useMutation} from '@apollo/client';
import {message} from 'antd';

import BaseForm, {
  BaseFormProps,
} from '../../../../components/organisms/Form/base';

import FeePayReceiveInput, {
  FeePayReceiveValueType,
} from './fee-pay-receive-input';
import {AddressType} from './address-input';
import {isEqualObject} from '@src/lib/utils';
import {useClaimPolicyForm} from './use-claim-policy-form';
import {
  UPDATE_MY_SELLER_CLAIM_POLICY_MUTATION,
  UPDATE_MY_SELLER_RETURN_ADDRESS_MUTATION,
} from '@src/operations/sellers/mutation';
import {ClaimFeePayMethod} from '@src/operations/__generated__/globalTypes';

import {FORM_ITEMS} from './form-items';

function ClaimPolicyForm() {
  const {defaultValue} = useClaimPolicyForm();

  const [updateMySellerReturnAddress] = useMutation(
    UPDATE_MY_SELLER_RETURN_ADDRESS_MUTATION,
  );
  const [updateMySellerClaimPolicy] = useMutation(
    UPDATE_MY_SELLER_CLAIM_POLICY_MUTATION,
  );

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
      const {returnAddress, feePayReceive, ...updateSellerClaimPolicyInput} =
        formValues;
      await handleSaveReturnAddress(returnAddress);

      const {feePayMethod, accountInput} =
        feePayReceive as FeePayReceiveValueType;

      await updateMySellerClaimPolicy({
        variables: {
          updateSellerClaimPolicyInput: {
            ...updateSellerClaimPolicyInput,
            feePayMethod,
            ...(feePayMethod === ClaimFeePayMethod.Trans && {
              accountInput,
            }),
          },
        },
      });
      message.success('저장되었습니다.');
    } catch (error) {
      message.error('저장에 실패했습니다');
    }
  };

  const newFormItems: BaseFormProps['FORM_ITEMS'] = {
    ...FORM_ITEMS,
    feePayReceive: {
      label: '교환배송비 수령방식',
      CustomInput: FeePayReceiveInput,
      rules: [
        {
          required: true,
          message: '교환 배송비 수령방식을 선택해주세요',
        },
      ],
    },
  };

  return (
    <BaseForm
      FORM_ITEMS={newFormItems}
      onSaveClick={handleSaveClick}
      defaultValue={{...defaultValue}}
    />
  );
}

export default ClaimPolicyForm;
