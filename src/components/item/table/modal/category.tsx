import React, {useState} from 'react';
import {Modal} from 'antd';

import ItemCategoryCascader from '@src/components/common/molecules/cascader/item-category';

import {useBoardContext} from '@src/contexts/Board';
import {useUpdateItem} from '@src/common/hooks/apis';

export type CategoryModalProps = {
  visible: boolean;
  onClose: () => void;
};

function CategoryModal({visible, onClose}: CategoryModalProps) {
  const {
    state: {selectedRowId, selectedData},
  } = useBoardContext();

  const [value, setValue] = useState<[number, number]>([
    selectedData?.majorCategory?.id,
    selectedData?.minorCategory?.id,
  ]);
  const {updateItem, updateCategoryCache} = useUpdateItem();

  const handleOk = async () => {
    const [majorCategoryId, minorCategoryId] = value;
    const updateItemInput = {majorCategoryId, minorCategoryId};
    await updateItem({
      variables: {
        itemId: selectedRowId,
        updateItemInput,
      },
      update: updateCategoryCache(selectedRowId, updateItemInput),
    });
    onClose();
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
