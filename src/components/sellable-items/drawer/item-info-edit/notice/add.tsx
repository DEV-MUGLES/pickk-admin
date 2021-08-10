import React, {useState} from 'react';
import {Modal, Button, ModalProps, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

import BaseForm from '@src/components/common/organisms/Form/base';
import ItemNoticeTypeSelect from './type-select';
import DayjsDatePicker from '@src/components/common/molecules/BoardFilter/input/DayjsDatePicker';

import {useBoardContext} from '@src/contexts/Board';
import {useAddItemNotice} from '@src/hooks/apis';

const {RangePicker} = DayjsDatePicker;

function ItemNoticeAddButton() {
  const {
    state: {selectedRowId},
  } = useBoardContext();

  const [visible, setVisible] = useState(false);
  const {addItemNotice, updateCache} = useAddItemNotice();

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
      update: updateCache(selectedRowId),
    })
      .then(() => {
        message.success('상품 안내메시지가 추가되었습니다.');
        setVisible(false);
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
        <BaseForm
          FORM_ITEMS={{
            type: {
              label: '타입 수정',
              CustomInput: ItemNoticeTypeSelect,
            },
            message: {
              label: '메세지',
            },
            range: {
              label: '적용 기간',
              CustomInput: RangePicker,
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
