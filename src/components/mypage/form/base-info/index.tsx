import {message} from 'antd';

import BaseForm from '../../../common/organisms/Form/base';

import {
  useMeSellerBaseInfo,
  useUpdateMeSellerBaseInfo,
} from '@src/hooks/apis/seller';

import {FORM_ITEMS} from './form-items';

function BaseInfoForm() {
  const {data} = useMeSellerBaseInfo();
  const [updateMe] = useUpdateMeSellerBaseInfo();

  const handleSaveClick = (updateSellerInput) => {
    updateMe({
      variables: {
        updateSellerInput,
      },
    })
      .then(() => {
        message.success('저장되었습니다.');
      })
      .catch(() => {
        message.error('저장에 실패했습니다.');
      });
  };

  return (
    <BaseForm
      FORM_ITEMS={FORM_ITEMS}
      onSaveClick={handleSaveClick}
      defaultValue={data?.meSeller}
    />
  );
}

export default BaseInfoForm;
