import {gql, useMutation, useQuery} from '@apollo/client';
import {message} from 'antd';

import BaseEditForm, {
  FormItemValueType,
} from '../../../../components/organisms/Form/base';
import FeePayReceiveInput from './fee-pay-receive-input';

import {AddressType} from './address-input';
import {AccountInputType} from '../../../../components/organisms/Form/Items/account-input';
import {
  SELLER_CLAIM_POLICY_FRAG,
  SELLER_RETURN_ADDRESS_FRAG,
} from '@src/operations/sellers/fragment';
import {
  UPDATE_MY_SELLER_CLAIM_POLICY_MUTATION,
  UPDATE_MY_SELLER_RETURN_ADDRESS_MUTATION,
} from '@src/operations/sellers/mutation';
import {ClaimFeePayMethod} from '@src/operations/__generated__/globalTypes';

import {FORM_ITEMS} from './form-items';
import {isEqualObject} from '@src/lib/utils';

const ME_SELLER_CLAIMPOLICY_QUERY = gql`
  ${SELLER_RETURN_ADDRESS_FRAG}
  ${SELLER_CLAIM_POLICY_FRAG}
  query MeSeller {
    meSeller {
      returnAddress {
        ...SellerReturnAddressFrag
      }
      claimPolicy {
        ...SellerClaimPolicyFrag
      }
    }
  }
`;

function ClaimPolicyEditForm() {
  const {data, refetch} = useQuery(ME_SELLER_CLAIMPOLICY_QUERY);
  const [updateMySellerReturnAddress] = useMutation(
    UPDATE_MY_SELLER_RETURN_ADDRESS_MUTATION,
  );
  const [updateMySellerClaimPolicy] = useMutation(
    UPDATE_MY_SELLER_CLAIM_POLICY_MUTATION,
  );

  const defaultValue = {
    returnAddress: data?.meSeller?.returnAddress,
    ...data?.meSeller?.claimPolicy,
    feePayReceive: {
      feePayMethod: data?.meSeller?.claimPolicy?.feePayMethod,
      accountInput: data?.meSeller?.claimPolicy?.account,
    },
  };

  const handleSaveReturnAddress = async (returnAddress) => {
    if (isEqualObject(data?.meSeller?.returnAddress, returnAddress)) {
      return;
    }

    const {baseAddress, detailAddress, postalCode}: AddressType = returnAddress;
    await updateMySellerReturnAddress({
      variables: {
        updateSellerReturnAddressInput: {
          baseAddress,
          detailAddress,
          postalCode,
        },
      },
    });
  };

  const handleSaveClick = async (formValues) => {
    try {
      const {returnAddress, feePayReceive, ...updateSellerClaimPolicyInput} =
        formValues;
      await handleSaveReturnAddress(returnAddress);

      const {feePayMethod, accountInput: _accountInput} = feePayReceive;
      let accountInput = null;
      if (feePayMethod === ClaimFeePayMethod.Trans && _accountInput) {
        const {bankCode, number, ownerName}: AccountInputType = _accountInput;
        accountInput = {
          bankCode,
          number,
          ownerName,
        };
      }

      await updateMySellerClaimPolicy({
        variables: {
          updateSellerClaimPolicyInput: {
            ...updateSellerClaimPolicyInput,
            feePayMethod,
            ...(accountInput && {
              accountInput,
            }),
          },
        },
      });
      message.success('저장되었습니다.');
      refetch();
    } catch (error) {
      message.error('저장에 실패했습니다');
    }
  };

  const newFormItems: {
    [name: string]: FormItemValueType;
  } = {
    ...FORM_ITEMS,
    feePayReceive: {
      label: '교환배송비 수령방식',
      Component: FeePayReceiveInput,
      rules: [
        {
          required: true,
          message: '교환 배송비 수령방식을 선택해주세요',
        },
      ],
    },
  };

  return (
    <BaseEditForm
      FORM_ITEMS={newFormItems}
      onSaveClick={handleSaveClick}
      defaultValue={defaultValue}
    />
  );
}

export default ClaimPolicyEditForm;
