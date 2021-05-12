import React, {useEffect, useState} from 'react';
import {message} from 'antd';
import {gql, useQuery} from '@apollo/client';
import {BASE_SELLER_FRAG, useUpdateMeSeller} from '@pickk/common';

import BaseEditForm from '../base';

import {FORM_ITEMS} from './form-items';

const BASE_ME_SELLER_QUERY = gql`
  ${BASE_SELLER_FRAG}
  query MeSeller {
    meSeller {
      ...BaseSellerFrag
    }
  }
`;

function BaseInfoEditForm() {
  const {data} = useQuery(BASE_ME_SELLER_QUERY);
  const [updateMe] = useUpdateMeSeller();
  const [defaultValue, setDefaultValue] = useState();

  useEffect(() => {
    setDefaultValue(data?.meSeller);
  }, [data]);

  const handleSaveClick = (updateSellerInput) => {
    updateMe({
      variables: {
        updateSellerInput,
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

export default BaseInfoEditForm;
