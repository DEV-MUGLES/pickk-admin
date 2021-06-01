import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {Modal, Button, ModalProps, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

import BaseEditForm from '@src/components/organisms/Form/base';
import ItemNoticeTypeSelect from './type-select';
import DayjsDatePicker from '@src/components/molecules/BoardFilter/input/DayjsDatePicker';

import {useBoardContext} from '@src/contexts/Board';
import {ADD_ITEM_NOTICE_MUTATION} from '@src/operations/item/mutation';
import {
  AddItemNotice,
  AddItemNoticeVariables,
} from '@src/operations/__generated__/AddItemNotice';

const {RangePicker} = DayjsDatePicker;

function ItemNoticeAddButton() {
  const {
    state: {selectedRowId},
    action: {reload},
  } = useBoardContext();

  const [visible, setVisible] = useState(false);
  const [addItemNotice] = useMutation<AddItemNotice, AddItemNoticeVariables>(
    ADD_ITEM_NOTICE_MUTATION,
  );

  const handleAddItemNoticeButton = () => {
    setVisible(true);
  };

  const handleSaveClick = (value) => {
    const {
      range: [startAt, endAt],
      ...addItemNoticeInput
    } = value;
    addItemNotice({
      variables: {
        itemId: selectedRowId,
        addItemNoticeInput: {
          ...addItemNoticeInput,
          startAt,
          endAt,
        },
      },
    })
      .then(() => {
        message.success('상품 안내메시지가 추가되었습니다.');
        setVisible(false);
        reload();
      })
      .catch(() => {
        message.error('상품 안내메시지 추가를 실패했습니다.');
      });
  };

  const modalProps: ModalProps = {
    title: '안내메시지 추가',
    footer: false,
    onCancel() {
      setVisible(false);
    },
  };

  return (
    <>
      <Button icon={<PlusOutlined />} onClick={handleAddItemNoticeButton}>
        안내메세지 추가
      </Button>
      <Modal visible={visible} {...modalProps}>
        <BaseEditForm
          FORM_ITEMS={{
            type: {
              label: '타입 수정',
              Component: ItemNoticeTypeSelect,
            },
            message: {
              label: '메세지',
            },
            range: {
              label: '적용 기간',
              Component: RangePicker,
            },
          }}
          onSaveClick={handleSaveClick}
          wrapperCol={{}}
          submitButtonText="추가"
          buttonAlign="right"
          style={{width: '100%'}}
        />
      </Modal>
    </>
  );
}

export default ItemNoticeAddButton;
