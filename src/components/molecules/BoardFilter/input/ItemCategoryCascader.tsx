import {useQuery} from '@apollo/client';
import {Cascader} from 'antd';

import {useBoardContext} from '@src/contexts/Board';

import {ITEM_CATEGORY_TREE_QUERY} from '@src/operations/item-category/query';

function ItemCategoryCascader() {
  const {state, action} = useBoardContext();
  const {filter} = state;
  const {handleFilterChange} = action;
  const {data} = useQuery(ITEM_CATEGORY_TREE_QUERY.gql);
  const categories =
    data?.[ITEM_CATEGORY_TREE_QUERY.dataName][0]?.children ?? [];
  const options = [{id: null, name: '전체'}, ...categories].map(
    ({id, name, children}) => ({
      value: id,
      label: name,
      ...(children && {
        children: [{id: null, name: '전체'}, ...children].map(
          ({id: cid, name: cname}) => ({
            value: cid,
            label: cname,
          }),
        ),
      }),
    }),
  );

  const handleChange = (value) => {
    handleFilterChange({
      majorCategoryId: value[0],
      minorCategoryId: value[1],
    });
  };

  return (
    <Cascader
      value={[
        filter['majorCategoryId'] ?? null,
        filter['minorCategoryId'] ?? null,
      ]}
      options={options}
      onChange={handleChange}
    />
  );
}

export default ItemCategoryCascader;
