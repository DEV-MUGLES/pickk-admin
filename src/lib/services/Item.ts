import base from './Api';
import {Filter} from '@src/types';
import {Item} from '@src/types/Item';
import {Product} from '@src/types/Product';

const getItemList = async (
  filter: Filter,
): Promise<{
  count: number;
  next: string;
  previous: string;
  results: Item[];
}> =>
  base(true)
    .get(`/partner/items/`, {
      params: {...filter, isReviewd: true, limit: 150, offset: 0},
    })
    .then(res => res.data);

const manageStock = (on: boolean, ids: number[]) =>
  base(true)
    .post('/partner/items/manage_stock/', {on, ids})
    .then(res => res.data);

const getProductList = (id: number): Promise<{results: Product[]}> =>
  base(true)
    .get(`/partner/items/${id}/products`)
    .then(res => res.data);

const ItemService = {
  getItemList,
  manageStock,
  getProductList,
};

export default ItemService;
