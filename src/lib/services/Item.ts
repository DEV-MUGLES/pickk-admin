import base from './Api';
import {Filter} from '@src/types';

const getItemList = async (filter: Filter) => {
  console.log(filter);
  return base(true)
    .get(`/partner/items/`, {
      params: {...filter, isReviewd: true, limit: 150, offset: 0},
    })
    .then(res => res.data);
};

const ItemService = {
  getItemList,
};

export default ItemService;
