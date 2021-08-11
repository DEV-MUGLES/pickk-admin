import {message, Modal} from 'antd';

import ExchangeRequestService from '@src/lib/services/ExchangeRequest';
import React from 'react';
import {ExclamationCircleOutlined} from '@ant-design/icons';

const {confirm} = Modal;

export const exchangeRequestActions = [
  {
    text: '반품으로 변경',
    onClick: async (ids: number[]) => {
      if (ids.length !== 1) {
        message.warning(
          '일괄 변경은 지원하지 않습니다.\n1개의 주문건만 선택해주세요.',
        );
        return;
      }
      try {
        confirm({
          title: '반품 변경 확인',
          icon: <ExclamationCircleOutlined />,
          content: '정말로 반품으로 변경하시겠습니까?.',
          okText: '예',
          okType: 'danger',
          cancelText: '아니오',
          async onOk() {
            await ExchangeRequestService.switchToRefundRequest(ids[0]);
          },
          onCancel() {
            message.warning('취소되었습니다.');
          },
        });
      } catch {}
    },
  },
];
