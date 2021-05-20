import React, {useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {Cascader, Modal} from 'antd';

import {useBoardContext} from '@src/contexts/Board';

import {ITEM_CATEGORY_TREE_QUERY} from '@src/operations/item-category/query';
import {UPDATE_ITEM_MUTATION} from '@src/operations/item/mutation';

export type CategoryModalProps = {
  itemId: number;
  visible: boolean;
  onClose: any;
};

function CategoryModal({itemId, visible, onClose}: CategoryModalProps) {
  const {
    action: {reload},
  } = useBoardContext();

  const [value, setValue] = useState([]);
  const {data} = useQuery(ITEM_CATEGORY_TREE_QUERY.gql);
  const categories =
    data?.[ITEM_CATEGORY_TREE_QUERY.dataName][0]?.children ?? [];
  const options = categories.map(({id, name, children}) => ({
    value: id,
    label: name,
    ...(children && {
      children: children.map(({id: cid, name: cname}) => ({
        value: cid,
        label: cname,
      })),
    }),
  }));
  const [update] = useMutation(UPDATE_ITEM_MUTATION.gql);

  const handleOk = async () => {
    await update({
      variables: {
        itemId,
        updateItemInput: {
          majorCategoryId: value[0],
          minorCategoryId: value[1],
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
