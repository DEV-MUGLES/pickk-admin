import React from 'react';
import {Cascader} from 'antd';

import {CustomInputProps} from '@src/components/common/organisms/Form/base';
import {useItemCategoryTree} from '@src/common/hooks/apis';

export type ItemCategoryCascaderProps = CustomInputProps<[number, number]> & {
  hasAll?: boolean;
};

function ItemCategoryCascader({
  value,
  onChange,
  hasAll = false,
}: ItemCategoryCascaderProps) {
  const {data} = useItemCategoryTree();
  const majorCategories = data?.itemCategoryTree ?? [];
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

  const handleChange = (value) => {
    onChange([value[0], value[1] || undefined]);
  };

  return <Cascader value={value} options={options} onChange={handleChange} />;
}

export default ItemCategoryCascader;
