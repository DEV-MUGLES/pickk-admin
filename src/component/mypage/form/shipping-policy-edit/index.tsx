import {message} from 'antd';
import {gql, useMutation, useQuery} from '@apollo/client';

import BaseEditForm from '../../../../components/organisms/Form/base';

import {SELLER_SHIPPING_POLICY_FRAG} from '@src/operations/sellers/fragment';
import {UPDATE_MY_SELLER_SHIPPING_POLICY_MUTATION} from '@src/operations/sellers/mutation';

import {FORM_ITEMS} from './form-items';

const ME_SELLER_SHIPPING_POLICY_QUERY = gql`
  ${SELLER_SHIPPING_POLICY_FRAG}
  query MeSeller {
    meSeller {
      shippingPolicy {
        ...SellerShippingPolicyFrag
      }
    }
  }
`;

function ShippingPolicyEditForm() {
  const {data, refetch} = useQuery(ME_SELLER_SHIPPING_POLICY_QUERY);
  const [updateShippingPolicy] = useMutation(
    UPDATE_MY_SELLER_SHIPPING_POLICY_MUTATION,
  );

  const handleSaveClick = (updateSellerShippingPolicyInput) => {
    updateShippingPolicy({
      variables: {
        updateSellerShippingPolicyInput,
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
      defaultValue={data?.meSeller?.shippingPolicy}
    />
  );
}

export default ShippingPolicyEditForm;
