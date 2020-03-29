import base from './Api';
import {Filter, Item, Product} from '@src/types';

const getList = (filter: Filter): Promise<Item[]> =>
  base(true)
    .get(`/partner/items/`, {
      params: filter,
    })
    .then(res => res.data);

const manageStockOn = (item: Array<{id: number; stock: number}>) =>
  base(true)
    .patch(`/partner/items/manage_stock/on/`, item)
    .then(res => res.data);

const manageStockOff = (ids: number[]) =>
  base(true)
    .post('/partner/items/manage_stock/off/', {ids})
    .then(res => res.data);

const getProductList = (id: number): Promise<Product[]> =>
  base(true)
    .get(`/partner/items/${id}/products`)
    .then(res => res.data);

const ItemService = {
  getList,
  manageStockOn,
  manageStockOff,
  getProductList,
};

export default ItemService;
