import base from './Api';
import {Filter, Item, Product, ItemSubsDiscountRateInfo} from '@src/types';

const getList = (filter: Filter): Promise<Item[]> =>
  base(true)
    .get(`/partner/items/`, {
      params: filter,
    })
    .then(res => res.data);

const getItem = (id: number): Promise<Item> =>
  base(true)
    .get(`/partner/items/${id}/`)
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

const getItemDiscountRateList = (
  itemPk: number,
): Promise<ItemSubsDiscountRateInfo[]> =>
  base(true)
    .get(`/partner/items/${itemPk}/discounts/`)
    .then(res => res.data);

const createItemDiscountRate = (
  itemPk: number,
  data: ItemSubsDiscountRateInfo,
): Promise<ItemSubsDiscountRateInfo> =>
  base(true)
    .post(`/partner/items/${itemPk}/discounts/`, data)
    .then(res => res.data);

const updateItemDiscountRate = (
  itemPk: number,
  id: number,
  data: ItemSubsDiscountRateInfo,
): Promise<ItemSubsDiscountRateInfo> =>
  base(true)
    .patch(`/partner/items/${itemPk}/discounts/${id}/`, data)
    .then(res => res.data);

const ItemService = {
  getList,
  getItem,
  manageStockOn,
  manageStockOff,
  getProductList,
  getItemDiscountRateList,
  updateItemDiscountRate,
  createItemDiscountRate,
};

export default ItemService;
