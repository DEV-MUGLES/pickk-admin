import ItemCategoryCascader from '../../cascader/item-category';

import {useBoardContext} from '@src/contexts/Board';

function ItemCategoryInput() {
  const {state, action} = useBoardContext();
  const {filter} = state;
  const {handleFilterChange} = action;

  const handleChange = ([majorCategoryId, minorCategoryId]) => {
    handleFilterChange({
      majorCategoryId,
      minorCategoryId,
    });
  };

  return (
    <ItemCategoryCascader
      value={[filter['majorCategoryId'], filter['minorCategoryId']]}
      onChange={handleChange}
      hasAll
    />
  );
}

export default ItemCategoryInput;
