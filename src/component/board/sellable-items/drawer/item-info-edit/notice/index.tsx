import styled from 'styled-components';
import {useMutation} from '@apollo/client';
import {message} from 'antd';
import {ItemNotice} from '@pickk/common';

import BaseForm from '@src/components/organisms/Form/base';
import ItemNoticeAddButton from './add';
import ItemNoticeTypeSelect from './type-select';

import {useBoardContext} from '@src/contexts/Board';
import {
  UPDATE_ITEM_NOTICE_MUTATION,
  REMOVE_ITEM_NOTICE_MUTATION,
} from '@src/operations/item/mutation';

function ItemNoticeEditSection() {
  const {
    state: {selectedRowId, selectedData},
    action: {reload},
  } = useBoardContext();
  const itemNotice: ItemNotice = selectedData?.notice;
  const [updateItemNotice] = useMutation(UPDATE_ITEM_NOTICE_MUTATION);
  const [removeItemNotice] = useMutation(REMOVE_ITEM_NOTICE_MUTATION);

  const handleSaveClick = (value) => {
    updateItemNotice({
      variables: {
        itemId: selectedRowId,
        updateItemNoticeInput: {...value},
      },
    })
      .then(() => {
        message.success('상품 안내메세지를 수정했습니다.');
        reload();
      })
      .catch(() => {
        message.error('저장에 실패했습니다.');
      });
  };

  const handleDeleteClick = () => {
    removeItemNotice({
      variables: {
        itemId: selectedRowId,
      },
    })
      .then(() => {
        message.success('상품 안내메세지를 삭제했습니다.');
        reload();
      })
      .catch(() => {
        message.error('삭제에 실패했습니다.');
      });
  };

  return (
    <Wrapper>
      {!itemNotice ? (
        <ItemNoticeAddButton />
      ) : (
        <BaseForm
          FORM_ITEMS={{
            type: {
              label: '타입 수정',
              CustomInput: ItemNoticeTypeSelect,
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
          onDeleteClick={handleDeleteClick}
          hasDeleteButton={true}
          wrapperCol={{}}
          defaultValue={{...itemNotice}}
          buttonAlign="right"
          style={{width: '100%'}}
        />
      )}
    </Wrapper>
  );
}

export default ItemNoticeEditSection;

const Wrapper = styled.div`
  display: flex;
  flex-direction: col;
  flex: 1;
`;
