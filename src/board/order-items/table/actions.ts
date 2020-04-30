import {message} from 'antd';
import prompt from 'antd-prompt';

import OrderItemService from '@src/lib/services/OrderItem';

export const orderItemActions = [
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
        const reason = await prompt({
          title: '반품 사유',
          placeholder: '반품 사유를 입력해주세요.',
          rules: [
            {
              required: true,
              message: '반품 사유는 필수 항목입니다.',
            },
          ],
        });
        await OrderItemService.refundRequest(ids[0], reason);
        return Promise.resolve(true);
      } catch {
        return Promise.resolve(false);
      }
    },
  },
];
