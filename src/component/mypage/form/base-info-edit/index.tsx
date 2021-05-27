import {message} from 'antd';
import {useMeSeller, useUpdateMeSeller} from '@pickk/common';

import BaseEditForm from '../../../../components/organisms/Form/base';

import {FORM_ITEMS} from './form-items';

function BaseInfoEditForm() {
  const {data} = useMeSeller();
  const [updateMe] = useUpdateMeSeller();

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
      defaultValue={data?.meSeller}
    />
  );
}

export default BaseInfoEditForm;
