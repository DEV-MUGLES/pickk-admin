import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {Modal, Button, ModalProps, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

import BaseEditForm from '@src/components/organisms/Form/base';
import ItemNoticeTypeSelect from './type-select';

import {useBoardContext} from '@src/contexts/Board';
import {ADD_ITEM_NOTICE_MUTATION} from '@src/operations/item/mutation';
import {
  AddItemNotice,
  AddItemNoticeVariables,
} from '@src/operations/__generated__/AddItemNotice';

function ItemNoticeAddButton() {
  const {
    state: {selectedRowId},
    action: {reload},
  } = useBoardContext();

  const [visible, setVisible] = useState(false);
  const [addItemNotice] = useMutation<AddItemNotice, AddItemNoticeVariables>(
    ADD_ITEM_NOTICE_MUTATION.gql,
  );

  const handleAddItemNoticeButton = () => {
    setVisible(true);
  };

  const handleSaveClick = (value) => {
    addItemNotice({
      variables: {
        itemId: selectedRowId,
        addItemNoticeInput: {
          ...value,
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
            startAt: {
              label: '시작일',
              type: 'date',
            },
            endAt: {
              label: '종료일',
              type: 'date',
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
