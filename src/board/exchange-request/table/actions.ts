import {message} from 'antd';

import ExchangeRequestService from '@src/lib/services/ExchangeRequest';

export const exchangeRequestActions = [
  {
    text: '반품으로 변경',
    onClick: async (ids: number[]) => {
      if (ids.length !== 1) {
        message.warning(
          '일괄 변경은 지원하지 않습니다.\n1개의 주문건만 선택해주세요.',
        );
        return Promise.resolve(false);
      }
      try {
        await ExchangeRequestService.switchToRefundRequest(ids[0]);
        return Promise.resolve(true);
      } catch {
        return Promise.resolve(false);
      }
    },
  },
];
