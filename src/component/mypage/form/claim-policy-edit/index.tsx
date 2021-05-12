import {useEffect, useState} from 'react';
import {message} from 'antd';
import {useMeSeller, useUpdateMySellerClaimPolicy} from '@pickk/common';

import BaseEditForm from '../base';

import {FORM_ITEMS} from './form-items';

function ClaimPolicyEditForm() {
  const {data} = useMeSeller();
  const [updateMe] = useUpdateMySellerClaimPolicy();
  const [defaultValue, setDefaultValue] = useState({});

  useEffect(() => {
    setDefaultValue(data?.meSeller?.claimPolicy);
  }, [data]);

  const handleSaveClick = (updateSellerClaimPolicyInput) => {
    updateMe({
      variables: {
        updateSellerClaimPolicyInput,
      },
    })
      .then(() => {
        message.success('저장되었습니다.');
      })
      .catch((error) => {
        console.log(error);
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

export default ClaimPolicyEditForm;
