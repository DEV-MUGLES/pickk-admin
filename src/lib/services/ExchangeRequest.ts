import base from './Api';
import {message} from 'antd';

import {ExchangeRequest, ExchangeRequestPreview, Filter} from '@src/types';

const getPreviewList = (): Promise<ExchangeRequestPreview> =>
  base(true)
    .get('/partner/exchange_requests/preview/')
    .then(res => res.data);

const getList = (filter: Filter): Promise<ExchangeRequest[]> =>
  base(true)
    .get('/partner/exchange_requests/', {
      params: filter,
    })
    .then(res => res.data);

const pick = (ids: number[]) =>
  base(true)
    .post('/partner/exchange_requests/pick/', {ids})
    .then(res => {
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
    .catch(err => message.error('실패했습니다. - ' + err));

const confirm = async (ids: number[]) => {
  if (ids.length !== 1) {
    message.warning(
      `교환 일괄 처리는 지원하지 않습니다.\n1개의 주문건만 선택해주세요.`,
    );
    return;
  }
  return base(true)
    .post(`/partner/exchange_requests/${ids[0]}/confirm/`)
    .then(res => {
      message.success(`교환 완료되었습니다.`);
    })
    .catch(err => message.error('실패했습니다. - ' + err));
};

const ExchangeRequestService = {
  getPreviewList,
  getList,
  pick,
  confirm,
};

export default ExchangeRequestService;
