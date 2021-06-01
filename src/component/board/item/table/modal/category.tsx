import React, {useState} from 'react';
import {useMutation} from '@apollo/client';
import {Modal} from 'antd';

import ItemCategoryCascader from '@src/components/molecules/cascader/item-category';

import {useBoardContext} from '@src/contexts/Board';

import {UPDATE_ITEM_MUTATION} from '@src/operations/item/mutation';
import {
  UpdateItem,
  UpdateItemVariables,
} from '@src/operations/__generated__/UpdateItem';

export type CategoryModalProps = {
  visible: boolean;
  onClose: any;
};

function CategoryModal({visible, onClose}: CategoryModalProps) {
  const {
    state: {selectedRowId, selectedData},
    action: {reload},
  } = useBoardContext();

  const [value, setValue] = useState<[number, number]>();
  const [update] =
    useMutation<UpdateItem, UpdateItemVariables>(UPDATE_ITEM_MUTATION);

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
      <ItemCategoryCascader
        defaultValue={[
          selectedData?.majorCategory?.id,
          selectedData?.minorCategory?.id,
        ]}
        value={value}
        onChange={setValue}
      />
    </Modal>
  );
}

export default CategoryModal;
