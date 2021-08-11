import {message, Modal} from 'antd';

import {TableActionType} from '@src/components/common/organisms/Board/Table/table';
import {useBulkUpdateItems} from '@src/common/hooks/apis';

const {confirm} = Modal;

const handleSetIsMdRecommended =
  (isMdRecommended: boolean): TableActionType['onClick'] =>
  async (ids, mutate) => {
    try {
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
        },
        onCancel() {
          message.warning('취소되었습니다.');
        },
      });
    } catch {}
  };

export const sellableItemActions: TableActionType[] = [
  {
    text: 'MD추천 ON',
    onClick: handleSetIsMdRecommended(true),
    useTableAction: useBulkUpdateItems,
  },
  {
    text: 'MD추천 OFF',
    onClick: handleSetIsMdRecommended(false),
    useTableAction: useBulkUpdateItems,
  },
  {
    text: '상품 비활성화',
    onClick: async (ids: number[], mutate) => {
      try {
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
          },
          onCancel() {
            message.warning('취소되었습니다.');
          },
        });
      } catch {}
    },
    useTableAction: useBulkUpdateItems,
  },
  {
    text: '상품 삭제',
    onClick: async () => null,
  },
  {
    text: '상품가격',
    onClick: async () => null,
  },
];
