import {message, Modal} from 'antd';

import {TableActionType} from '@src/components/organisms/Board/Table/table';
import {BULK_UPDATE_ITEMS_MUTATION} from '@src/operations/item/mutation';

const {confirm} = Modal;

const handleSetIsSellable =
  (isSellable: boolean): TableActionType['handleClick'] =>
  async (ids, mutate) => {
    return new Promise((resolve, reject) => {
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
          resolve(true);
        },
        onCancel() {
          message.warning('취소되었습니다.');
          reject();
        },
      });
    });
  };

export const itemActions: TableActionType[] = [
  {
    text: '상품 활성화',
    handleClick: handleSetIsSellable(true),
    operation: BULK_UPDATE_ITEMS_MUTATION,
  },
  {
    text: '상품 비활성화',
    handleClick: handleSetIsSellable(false),
    operation: BULK_UPDATE_ITEMS_MUTATION,
  },
  {
    text: '상품 삭제',
    handleClick: async (ids: number[]) => {
      return Promise.resolve(false);
    },
  },
];
