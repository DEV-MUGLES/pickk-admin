import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {Modal} from 'antd';

import ItemCategoryCascader from '@src/components/molecules/cascader/item-category';

import {useBoardContext} from '@src/contexts/Board';

import {UPDATE_ITEM_MUTATION} from '@src/operations/item/mutation';

export type CategoryModalProps = {
  visible: boolean;
  onClose: any;
};

function CategoryModal({visible, onClose}: CategoryModalProps) {
  const {
    state: {selectedRowId, selectedData},
    action: {reload},
  } = useBoardContext();

  const [value, setValue] = useState<[number, number]>([
    selectedData?.majorCategory?.id,
    selectedData?.minorCategory?.id,
  ]);
  const [update] = useMutation(UPDATE_ITEM_MUTATION);

  const handleOk = async () => {
    const [majorCategoryId, minorCategoryId] = value;
    await update({
      variables: {
        itemId: selectedRowId,
        updateItemInput: {
          majorCategoryId,
          minorCategoryId,
        },
      },
    });
    onClose();
    reload();
  };

  return (
    <Modal
      title="카테고리 설정"
      visible={visible}
      onCancel={() => {
        onClose();
      }}
      onOk={handleOk}>
      <ItemCategoryCascader value={value} onChange={setValue} />
    </Modal>
  );
}

export default CategoryModal;
