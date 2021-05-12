import React, {useEffect, useState} from 'react';
import {message} from 'antd';
import {useMeSeller, useUpdateMySellerShippingPolicy} from '@pickk/common';

import BaseEditForm from '../base';

import {FORM_ITEMS} from './form-items';

function ShippingPolicyEditForm() {
  const {data} = useMeSeller();
  const [updateMe] = useUpdateMySellerShippingPolicy();
  const [defaultValue, setDefaultValue] = useState({});

  useEffect(() => {
    setDefaultValue(data?.meSeller?.shippingPolicy);
  }, [data]);

  const handleSaveClick = (updateSellerShippingPolicyInput) => {
    updateMe({
      variables: {
        updateSellerShippingPolicyInput,
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

export default ShippingPolicyEditForm;