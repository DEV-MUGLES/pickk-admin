import {message, Modal} from 'antd';

import {TableActionType} from '@src/components/common/organisms/Board/Table/table';
import {useBulkUpdateItems} from '@src/hooks/apis';

const {confirm} = Modal;

const handleSetIsSellable =
  (isSellable: boolean): TableActionType['handleClick'] =>
  async (ids, mutate) => {
    const isSellableText = isSellable ? '활성화' : '비활성화';
    try {
      confirm({
        title: `상품 ${isSellableText} 확인`,
        content: `상품을 ${isSellableText} 하시겠습니까?`,
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
    } catch {}
  };

export const itemActions: TableActionType[] = [
  {
    text: '상품 활성화',
    handleClick: handleSetIsSellable(true),
    useTableAction: useBulkUpdateItems,
  },
  {
    text: '상품 비활성화',
    handleClick: handleSetIsSellable(false),
    useTableAction: useBulkUpdateItems,
  },
  {
    text: '상품 삭제',
    handleClick: async (ids: number[]) => null,
  },
];
