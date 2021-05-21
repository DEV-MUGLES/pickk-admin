import React, {useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {Cascader, Modal} from 'antd';

import {useBoardContext} from '@src/contexts/Board';

import {ITEM_MAJOR_CATEGORIES_QUERY} from '@src/operations/item-category/query';
import {UPDATE_ITEM_MUTATION} from '@src/operations/item-temp/mutation';
import {ItemMajorCategories} from '@src/operations/__generated__/ItemMajorCategories';
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
    state: {selectedData},
  } = useBoardContext();

  const {
    action: {reload},
  } = useBoardContext();

  const [value, setValue] = useState([]);
  const {data} = useQuery<ItemMajorCategories>(ITEM_MAJOR_CATEGORIES_QUERY.gql);
  const majorCategories = data?.itemMajorCategories ?? [];
  const options = majorCategories.map(({id, name, children}) => ({
    value: id,
    label: name,
    ...(children && {
      children: children.map(({id: cid, name: cname}) => ({
        value: cid,
        label: cname,
      })),
    }),
  }));
  const [update] = useMutation<UpdateItem, UpdateItemVariables>(
    UPDATE_ITEM_MUTATION.gql,
  );

  const handleOk = async () => {
    const [majorCategoryId, minorCategoryId] = value;
    await update({
      variables: {
        itemId: selectedData.id,
        updateItemInput: {
          majorCategoryId,
          minorCategoryId,
        },
      },
    });
    onClose();
    setValue([]);
    reload();
  };

  return (
    <Modal
      title="카테고리 설정"
      visible={visible}
      onCancel={() => {
        onClose();
        setValue([]);
      }}
      onOk={handleOk}>
      <Cascader options={options} onChange={setValue} value={value} />
    </Modal>
  );
}

export default CategoryModal;
