import gql from 'graphql-tag';
import {useQuery, useMutation} from '@apollo/client';
import {message} from 'antd';

import BaseEditForm from '@src/components/organisms/Form/base';

import {SELLER_SETTLE_POLICY_FRAG} from '@src/operations/sellers/fragment';
import {UPDATEE_MY_SELLER_SETTLE_POLICY_MUTATION} from '@src/operations/sellers/mutation';

import {FORM_ITEMS} from './form-items';

const ME_SELLER_SHIPPING_POLICY_QUERY = gql`
  ${SELLER_SETTLE_POLICY_FRAG}
  query MeSeller {
    meSeller {
      settlePolicy {
        ...SettlePolicyFrag
      }
    }
  }
`;

function SettlePolicyEditForm() {
  const {data, refetch} = useQuery(ME_SELLER_SHIPPING_POLICY_QUERY);
  const [updateSettlePolicy] = useMutation(
    UPDATEE_MY_SELLER_SETTLE_POLICY_MUTATION,
  );
  const defaultValue = {
    ...data?.meSeller?.settlePolicy,
    accountInput: data?.meSeller?.settlePolicy?.account,
  };

  const handleSaveClick = (updateSellerSettlePolicyInput) => {
    const {bankCode, number, ownerName} =
      updateSellerSettlePolicyInput.accountInput;
    updateSettlePolicy({
      variables: {
        updateSellerSettlePolicyInput: {
          ...updateSellerSettlePolicyInput,
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
        refetch();
      })
      .catch((error) => {
        message.error('저장에 실패했습니다');
      });
  };

  return (
    <BaseEditForm
      FORM_ITEMS={FORM_ITEMS}
      onSaveClick={handleSaveClick}
      defaultValue={defaultValue}
    />
  );
}

export default SettlePolicyEditForm;
