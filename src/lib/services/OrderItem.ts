import base from './Api';
import {Filter, OrderItem} from '@src/types';

const getList = (filter: Filter): Promise<OrderItem[]> =>
  base(true)
    .get('/partner/order_items/', {
      params: filter,
    })
    .then(res => res.data);

const OrderItemService = {
  getList,
};

export default OrderItemService;
