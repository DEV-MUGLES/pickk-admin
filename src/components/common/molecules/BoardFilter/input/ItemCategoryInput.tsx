import ItemCategoryCascader from '../../../../new-common/molecules/form-inputs/item-category-cascader';

import {useBoardContext} from '@src/common/contexts/Board';

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
