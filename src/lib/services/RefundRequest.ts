import base from './Api';
import {message} from 'antd';

import {RefundRequest, RefundRequestPreview, Filter} from '@src/types';

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

const RefundRequestService = {
  getPreviewList,
  getList,
  pick,
  confirm,
};

export default RefundRequestService;
