import {message} from 'antd';

import base from './Api';
import {Filter, OrderItemShip, OrderItem, ItemOption} from '@src/types';

const ship = async (ships: OrderItemShip[]) =>
  base(true)
    .post(`/partner/order_items/ship/`, ships)
    .then((res) => {
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
    .catch((err) => {
      message.error('실패했습니다. - ' + err);
    });

const getList = (filter: Filter): Promise<OrderItem[]> =>
  base(true)
    .get('/partner/order_items/', {
      params: filter,
    })
    .then((res) => res.data);

const refundRequest = (id: number, reason: string) =>
  base(true)
    .post(`/partner/order_items/${id}/refund_request/`, {reason})
    .then(() => {
      message.success(`반품으로 전환되었습니다.`);
    })
    .catch((err) => {
      switch (err?.response?.status) {
        case 400:
          alert(`${err.response.data?.errorMessage}\n다시 확인해주세요.`);
          break;
        case 404:
          alert(`해당 주문을 찾을 수 없습니다.\n다시 확인해주세요.`);
          break;
        default:
          alert(
            `${
              err.response.data?.errorMessage || '반품으로 변경에 실패했습니다.'
            }\n운영팀으로 문의 주시면 신속히 처리해드리겠습니다.\n이용에 불편을 드려 죄송합니다.`,
          );
          break;
      }
      throw err;
    });

const exchangeRequest = (id: number, changeTo: number, reason: string) =>
  base(true)
    .post(`/partner/order_items/${id}/exchange_request/`, {changeTo, reason})
    .then(() => {
      message.success(`교환요청으로 전환되었습니다.`);
    })
    .catch((err) => {
      switch (err?.response?.status) {
        case 400:
          alert(`${err.response.data?.errorMessage}\n다시 확인해주세요.`);
          break;
        case 404:
          alert(`해당 주문을 찾을 수 없습니다.\n다시 확인해주세요.`);
          break;
        default:
          alert(
            `${
              err.response.data?.errorMessage || '반품으로 변경에 실패했습니다.'
            }\n운영팀으로 문의 주시면 신속히 처리해드리겠습니다.\n이용에 불편을 드려 죄송합니다.`,
          );
          break;
      }
      throw err;
    });

const OrderItemService = {
  ship,
  getList,
  refundRequest,
  exchangeRequest,
};

export default OrderItemService;
