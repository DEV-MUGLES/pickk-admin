import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {Input, message, Modal} from 'antd';

import {UPDATE_ITEM_OPTION_MUTATION} from '@src/operations/item/mutation';
import {
  UpdateItemOption,
  UpdateItemOptionVariables,
} from '@src/operations/__generated__/UpdateItemOption';

export type OptionNameEditModalProps = {
  optionId: number;
  visible: boolean;
  onClose: () => void;
};

function OptionNameEditModal({
  optionId,
  visible,
  onClose,
}: OptionNameEditModalProps) {
  const [name, setName] = useState<string>();
  const [updateItemOption] = useMutation<
    UpdateItemOption,
    UpdateItemOptionVariables
  >(UPDATE_ITEM_OPTION_MUTATION);

  const handleChange = ({target: {value}}) => {
    setName(value);
  };

  const handleOk = () => {
    updateItemOption({
      variables: {
        id: optionId,
        updateItemOptionInput: {
          name,
        },
      },
    })
      .then(() => {
        message.success('옵션명을 변경했습니다.');
        onClose();
      })
      .catch(() => {
        message.error('저장에 실패했습니다.');
      });
  };

  return (
    <Modal
      title="옵션명 수정"
      visible={visible}
      onCancel={onClose}
      onOk={handleOk}
      cancelText="취소"
      okText="저장">
      <Input
        value={name}
        onChange={handleChange}
        placeholder="변경할 옵션명을 입력해주세요."
      />
    </Modal>
  );
}

export default OptionNameEditModal;
