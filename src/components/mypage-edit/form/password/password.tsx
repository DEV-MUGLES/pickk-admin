import {message} from 'antd';

import BaseForm from '@src/components/common/organisms/Form/base';

import {useUpdateMyPassword} from './hooks';

function PasswordForm() {
  const {updateMyPassword} = useUpdateMyPassword();

  const handleSaveClick = async (form: {
    oldPassword: string;
    newPassword: string;
  }) => {
    try {
      await updateMyPassword(form.oldPassword, form.newPassword);
      message.success('변경되었습니다.');
    } catch (error) {
      message.error('변경에 실패했습니다. err - ' + error);
    }
  };

  return (
    <BaseForm
      FORM_ITEMS={{
        oldPassword: {
          label: '이전 비밀번호',
          rules: [
            {
              required: true,
              message: '이전 비밀번호를 입력해주세요.',
            },
          ],
        },
        newPassword: {
          label: '새로운 비밀번호',
          rules: [
            {
              required: true,
              message: '새로운 비밀번호를 입력해주세요.',
            },
          ],
        },
      }}
      style={{marginTop: '0.8rem'}}
      onSaveClick={handleSaveClick}
    />
  );
}

export default PasswordForm;
