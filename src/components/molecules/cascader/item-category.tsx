import React from 'react';
import {useQuery} from '@apollo/client';
import {Cascader} from 'antd';

import {ITEM_MAJOR_CATEGORIES_QUERY} from '@src/operations/item-category/query';
import {ItemMajorCategories} from '@src/operations/__generated__/ItemMajorCategories';

export type ItemCategoryCascaderProps = {
  defaultValue?: [number, number];
  value: [number, number];
  onChange: (value: [number, number]) => void;
  hasAll?: boolean;
};

function ItemCategoryCascader({
  defaultValue,
  value,
  onChange,
  hasAll = false,
}: ItemCategoryCascaderProps) {
  const {data} = useQuery<ItemMajorCategories>(ITEM_MAJOR_CATEGORIES_QUERY);
  const majorCategories = data?.itemMajorCategories ?? [];
  const options = (
    hasAll ? [{id: undefined, name: '전체', children: null}] : []
  )
    .concat(majorCategories)
    .map(({id, name, children}) => ({
      value: id,
      label: name,
      ...(children && {
        children: (hasAll
          ? [{id: undefined, name: '전체', children: null}]
          : []
        )
          .concat(children)
          .map(({id: cid, name: cname}) => ({
            value: cid,
            label: cname,
          })),
      }),
    }));

  return (
    <Cascader
      value={value ?? defaultValue}
      options={options}
      onChange={onChange}
    />
  );
}

export default ItemCategoryCascader;
