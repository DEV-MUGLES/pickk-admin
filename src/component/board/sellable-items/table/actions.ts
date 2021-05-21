import {message, Modal} from 'antd';

import {BULK_UPDATE_ITEMS_MUTATION} from '@src/operations/item/mutation';
import {TableActionType} from '@src/components/organisms/Board/Table/table';

const {confirm} = Modal;

const handleSetIsMdRecommended =
  (isMdRecommended: boolean): TableActionType['handleClick'] =>
  async (ids, mutate) => {
    return new Promise((resolve, reject) => {
      confirm({
        title: `MD 추천 ${isMdRecommended ? 'ON' : 'OFF'} 확인`,
        content: `MD 추천 상품${
          isMdRecommended ? '으로 설정합니다.' : '을 해제합니다.'
        }`,
        okText: '예',
        okType: 'danger',
        cancelText: '아니오',
        async onOk() {
          await mutate({
            variables: {
              bulkUpdateItemInput: {
                isMdRecommended,
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

export const sellableItemActions: TableActionType[] = [
  {
    text: 'MD추천 ON',
    handleClick: handleSetIsMdRecommended(true),
    operation: BULK_UPDATE_ITEMS_MUTATION,
  },
  {
    text: 'MD추천 OFF',
    handleClick: handleSetIsMdRecommended(false),
    operation: BULK_UPDATE_ITEMS_MUTATION,
  },
  {
    text: '상품 비활성화',
    handleClick: async (ids: number[], mutate) => {
      return new Promise((resolve, reject) => {
        confirm({
          title: '상품 비활성화 확인',
          content: '상품을 비활성화 하시겠습니까?',
          okText: '예',
          okType: 'danger',
          cancelText: '아니오',
          async onOk() {
            await mutate({
              variables: {
                bulkUpdateItemInput: {
                  isSellable: false,
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
    },
    operation: BULK_UPDATE_ITEMS_MUTATION,
  },
  {
    text: '상품 삭제',
    handleClick: async () => {
      return false;
    },
  },
  {
    text: '상품가격',
    handleClick: async () => {
      return false;
    },
  },
];
