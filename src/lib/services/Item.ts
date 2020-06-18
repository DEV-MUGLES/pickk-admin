import base from './Api';
import {Filter, Item, Product, ItemDiscount} from '@src/types';
import {message} from 'antd';

const getList = (filter: Filter): Promise<Item[]> =>
  base(true)
    .get(`/partner/items/`, {
      params: filter,
    })
    .then((res) => res.data);

const getItem = (id: number): Promise<Item> =>
  base(true)
    .get(`/partner/items/${id}/`)
    .then((res) => res.data);

const getOptions = (id: number) =>
  base()
    .get(`/items/${id}/options/`)
    .then((res) => res.data);

const manageStockOn = (item: Array<{id: number; stock: number}>) =>
  base(true)
    .patch(`/partner/items/manage_stock/on/`, item)
    .then((res) => res.data);

const manageStockOff = (ids: number[]) =>
  base(true)
    .post('/partner/items/manage_stock/off/', {ids})
    .then((res) => res.data);

const getProductList = (id: number): Promise<Product[]> =>
  base(true)
    .get(`/partner/items/${id}/products`)
    .then((res) => res.data);

const getItemDiscountRateList = (itemPk: number): Promise<ItemDiscount[]> =>
  base(true)
    .get(`/partner/items/${itemPk}/discounts/`)
    .then((res) => res.data);

const createItemDiscountRate = (
  itemPk: number,
  data: ItemDiscount,
): Promise<ItemDiscount> =>
  base(true)
    .post(`/partner/items/${itemPk}/discounts/`, data)
    .then(() => message.success('할인율이 업데이트 되었습니다.'));

const updateItemDiscountRate = (
  itemPk: number,
  id: number,
  data: ItemDiscount,
): Promise<ItemDiscount> =>
  base(true)
    .patch(`/partner/items/${itemPk}/discounts/${id}/`, data)
    .then(() => message.success('할인율이 업데이트 되었습니다.'))
    .catch((err) => {
      if (!err.response || err.response.status !== 400) {
        message.error('문제가 발생했습니다. 다시 시도해주세요.');
        return;
      }
      message.error('기본 구독할인율 보다 낮게 설정할 수 없습니다.');
    });

const discountsList = (itemPk: number) =>
  base(true)
    .get(`/partner/items/${itemPk}/discounts/`)
    .then((res) => res.data);

const discountsCreate = (
  itemPk: number,
  body: {userId: number; discountRate: number; startAt: string; endAt: string},
) =>
  base(true)
    .post(`/partner/items/${itemPk}/discounts/`, body)
    .then((res) => res.data);

const discountsPartialUpdate = (
  itemPk: number,
  id: number,
  body: Partial<{
    userId: number;
    discountRate: number;
    startAt: string;
    endAt: string;
  }>,
) =>
  base(true)
    .patch(`/partner/items/${itemPk}/discounts/${id}/`, body)
    .then((res) => res.data);

const discountsDelete = (itemPk: number, id: number) =>
  base(true)
    .delete(`/partner/items/${itemPk}/discounts/${id}/`)
    .then((res) => res.data);

const ItemService = {
  getList,
  getItem,
  getOptions,
  manageStockOn,
  manageStockOff,
  getProductList,
  getItemDiscountRateList,
  updateItemDiscountRate,
  createItemDiscountRate,
  discountsList,
  discountsCreate,
  discountsPartialUpdate,
  discountsDelete,
};

export default ItemService;
