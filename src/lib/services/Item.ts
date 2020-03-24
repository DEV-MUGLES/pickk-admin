import base from './Api';
import {Filter} from '@src/types';
import {Item} from '@src/types/Item';

const getItemList = async (
  filter: Filter,
): Promise<{
  count: number;
  next: string;
  previous: string;
  results: Item[];
}> => {
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
