import {message, Modal} from 'antd';

import {useBulkUpdateItems} from '@pickk/common';

const {confirm} = Modal;

const handleSetIsSellable =
  (isSellable: boolean) => async (ids: number[], mutate) => {
    try {
      confirm({
        title: `상품 ${isSellable ? '' : '비'}활성화 확인`,
        content: `상품을 ${isSellable ? '' : '비'}활성화 하시겠습니까?`,
        okText: '예',
        okType: 'danger',
        cancelText: '아니오',
        async onOk() {
          await mutate({
            variables: {
              bulkUpdateItemInput: {
                isSellable,
              },
              ids,
            },
          });
        },
        onCancel() {
          message.warning('취소되었습니다.');
        },
      });

      return Promise.resolve(true);
    } catch {
      return Promise.resolve(false);
    }
  };

export const itemActions = [
  {
    text: '상품 활성화',
    onClick: handleSetIsSellable(true),
    hook: useBulkUpdateItems,
  },
  {
    text: '상품 비활성화',
    onClick: handleSetIsSellable(false),
    hook: useBulkUpdateItems,
  },
  {
    text: '상품 삭제',
    onClick: async (ids: number[]) => {
      return Promise.resolve(false);
    },
  },
];
