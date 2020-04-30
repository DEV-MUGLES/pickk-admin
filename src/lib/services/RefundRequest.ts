import base from './Api';
import {message} from 'antd';

import {
  RefundRequest,
  RefundRequestPreview,
  Filter,
  ItemOption,
} from '@src/types';

const getPreviewList = (): Promise<RefundRequestPreview> =>
  base(true)
    .get('/partner/refund_requests/preview/')
    .then((res) => res.data);

const getList = (filter: Filter): Promise<RefundRequest[]> =>
  base(true)
    .get('/partner/refund_requests/', {
      params: filter,
    })
    .then((res) => res.data);

const pick = (ids: number[]) =>
  base(true)
    .post('/partner/refund_requests/pick/', {ids})
    .then((res) => {
      const {requested, success} = res.data;
      if (requested === 0) {
        message.warning(`요청된 데이터가 없습니다.`);
      } else if (requested === success) {
        message.success(
          `수거 완료되었습니다. - 요청 : ${requested} / 성공 : ${success}`,
        );
      } else {
        message.error(
          `일부 품목이 적용되지 않았습니다. - 요청 : ${requested} / 성공 : ${success}`,
        );
      }
    })
    .catch((err) => message.error('실패했습니다. - ' + err));

const confirm = async (id: number, shippingFee?: 'FULL' | 'HALF') => {
  return base(true)
    .post(
      `/partner/refund_requests/${id}/confirm/` +
        (shippingFee ? `?shippingFee=${shippingFee}` : ''),
    )
    .then((res) => {
      message.success(`반품 완료되었습니다.`);
    })
    .catch((err) => message.error('실패했습니다. - ' + err));
};

const switchToExchangeRequest = (id: number, changeTo: ItemOption) =>
  base(true)
    .post(`/partner/refund_requests/${id}/switch_to_exchange/`, {changeTo})
    .then(() => message.success(`교환으로 전환되었습니다.`))
    .catch((err) => {
      switch (err?.response?.status) {
        case 400:
          alert(`${err.response.data?.errorMessage}\n다시 확인해주세요.`);
          break;
        default:
          alert(
            `${
              err.response.data?.errorMessage || '교환으로 변경에 실패했습니다.'
            }\n운영팀으로 문의 주시면 신속히 처리해드리겠습니다.\n이용에 불편을 드려 죄송합니다.`,
          );
          break;
      }
      throw err;
    });

const RefundRequestService = {
  getPreviewList,
  getList,
  pick,
  confirm,
  switchToExchangeRequest,
};

export default RefundRequestService;
