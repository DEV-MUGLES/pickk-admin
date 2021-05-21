import {useQuery} from '@apollo/client';
import {Cascader} from 'antd';

import {useBoardContext} from '@src/contexts/Board';

import {ITEM_MAJOR_CATEGORIES_QUERY} from '@src/operations/item-category/query';

function ItemCategoryCascader() {
  const {state, action} = useBoardContext();
  const {filter} = state;
  const {handleFilterChange} = action;
  const {data} = useQuery(ITEM_MAJOR_CATEGORIES_QUERY.gql);
  const majorCategories = data?.[ITEM_MAJOR_CATEGORIES_QUERY.dataName] ?? [];
  const options = [{id: undefined, name: '전체'}, ...majorCategories].map(
    ({id, name, children}) => ({
      value: id,
      label: name,
      ...(children && {
        children: [{id: undefined, name: '전체'}, ...children].map(
          ({id: cid, name: cname}) => ({
            value: cid,
            label: cname,
          }),
        ),
      }),
    }),
  );

  const handleChange = ([majorCategoryId, minorCategoryId]) => {
    handleFilterChange({
      majorCategoryId,
      minorCategoryId,
    });
  };

  return (
    <Cascader
      value={[filter['majorCategoryId'], filter['minorCategoryId']]}
      options={options}
      onChange={handleChange}
    />
  );
}

export default ItemCategoryCascader;
