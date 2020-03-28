import {message} from 'antd';

import base from './Api';
import {Filter, OrderItemShip, OrderItem} from '@src/types';

const ship = async (ships: OrderItemShip[]) =>
  base(true)
    .post(`/partner/order_items/ship/`, ships)
    .then(res => {
      const {requested, success} = res.data;
      if (requested === 0) {
        message.error(`변경된 데이터가 없습니다.`);
      } else if (requested === success) {
        message.success(
          `적용되었습니다. - 요청 : ${requested} / 성공 : ${success}`,
        );
      } else {
        message.error(
          `일부 품목이 적용되지 않았습니다. - 요청 : ${requested} / 성공 : ${success}`,
        );
      }
    })
    .catch(err => {
      message.error('실패했습니다. - ' + err);
    });

const getList = (filter: Filter): Promise<OrderItem[]> =>
  base(true)
    .get('/partner/order_items/', {
      params: filter,
    })
    .then(res => res.data);

const OrderItemService = {
  ship,
  getList,
};

export default OrderItemService;
