import base from './Api';
import {Filter, Item, Product} from '@src/types';

const getList = (filter: Filter): Promise<Item[]> =>
  base(true)
    .get(`/partner/items/`, {
      params: filter,
    })
    .then(res => res.data);

const manageStock = (on: boolean, ids: number[]) =>
  base(true)
    .post('/partner/items/manage_stock/', {on, ids})
    .then(res => res.data);

const getProductList = (id: number): Promise<Product[]> =>
  base(true)
    .get(`/partner/items/${id}/products`)
    .then(res => res.data);

const ItemService = {
  getList,
  manageStock,
  getProductList,
};

export default ItemService;
