import {message} from 'antd';

import {TableActionType} from '@src/components/common/organisms/Board/Table/table';
import {useBulkUpdateItems} from '@src/common/hooks/apis';

const handleSetIsMdRecommended =
  (isMdRecommended: boolean): TableActionType['onClick'] =>
  async (ids, mutate) => {
    try {
      if (
        confirm(
          `MD 추천 상품${
            isMdRecommended ? '으로 설정합니다.' : '을 해제합니다.'
          }`,
        )
      ) {
        await mutate({
          variables: {
            bulkUpdateItemInput: {
              isMdRecommended,
            },
            ids,
          },
        });
      }
    } catch (err) {
      message.error('실패했습니다. err - ' + err);
    }
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
        if (confirm('상품을 비활성화 하시겠습니까?')) {
          await mutate({
            variables: {
              bulkUpdateItemInput: {
                isSellable: false,
              },
              ids,
            },
          });
        }
      } catch (err) {
        message.error('실패했습니다. err - ' + err);
      }
    },
    useTableAction: useBulkUpdateItems,
  },
  // @TODO 추후 구현
  // {
  //   text: '상품 삭제',
  //   onClick: async () => null,
  // },
  {
    text: '상품가격',
    onClick: async () => null,
  },
];
