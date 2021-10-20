import React, {useState} from 'react';
import {message, Modal} from 'antd';

import ItemCategoryCascader from '@components/new-common/molecules/form-inputs/item-category-cascader';

import {useBoardContext} from '@src/common/contexts/Board';

import {useUpdateItemCategory} from './hooks';

export type CategoryModalProps = {
  visible: boolean;
  onClose: () => void;
};

function CategoryModal({visible, onClose}: CategoryModalProps) {
  const {
    state: {selectedRowId, selectedData},
  } = useBoardContext();

  const [values, setValues] = useState<[number, number]>([
    selectedData?.majorCategory?.id,
    selectedData?.minorCategory?.id,
  ]);
  const {updateItemCategory} = useUpdateItemCategory();

  const handleOk = async () => {
    try {
      const [majorCategoryId, minorCategoryId] = values;

      await updateItemCategory(selectedRowId, majorCategoryId, minorCategoryId);
      message.success('카테고리가 변경되었습니다.');
    } catch (error) {
      message.error('실패했습니다. err - ' + error);
    }

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
      <ItemCategoryCascader value={values} onChange={setValues} />
    </Modal>
  );
}

export default CategoryModal;
