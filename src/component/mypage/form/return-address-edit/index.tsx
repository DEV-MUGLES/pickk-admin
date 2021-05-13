import {message} from 'antd';
import {useMeSeller, useUpdateMySellerReturnAddress} from '@pickk/common';

import BaseEditForm from '../base';

import {FORM_ITEMS} from './form-items';

function ReturnAddressEditForm() {
  const {data} = useMeSeller();
  const [updateMe] = useUpdateMySellerReturnAddress();

  const handleSaveClick = (updateSellerReturnAddressInput) => {
    updateMe({
      variables: {
        updateSellerReturnAddressInput,
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
      defaultValue={data?.meSeller?.returnAddress}
    />
  );
}

export default ReturnAddressEditForm;
