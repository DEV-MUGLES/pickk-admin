import base from './Api';
import {message} from 'antd';

import {ExchangeRequest, ExchangeRequestPreview, Filter} from '@src/types';

const getPreviewList = (): Promise<ExchangeRequestPreview> =>
  base(true)
    .get('/partner/exchange_requests/preview/')
    .then((res) => res.data);

const getList = (filter: Filter): Promise<ExchangeRequest[]> =>
  base(true)
    .get('/partner/exchange_requests/', {
      params: filter,
    })
    .then((res) => res.data);

const pick = (ids: number[]) =>
  base(true)
    .post('/partner/exchange_requests/pick/', {ids})
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
    });

const ExchangeRequestService = {
  getPreviewList,
  getList,
  pick,
};

export default ExchangeRequestService;
