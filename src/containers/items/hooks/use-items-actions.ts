import {message} from 'antd';

import {TableActionType} from '@components/new-common/organisms/board-table/actions';
import {useBulkUpdateIsSellable} from '@components/sellable-items/table';

export const useItemsActions = ({
  selectedIds,
  initSelection,
  reload,
}: {
  selectedIds: number[];
  initSelection: () => void;
  reload: () => void;
}) => {
  const {bulkUpdateIsSellable} = useBulkUpdateIsSellable();

  const itemsActions: TableActionType[] = [
    {
      text: '상품 활성화',
      onClick: async () => {
        try {
          if (confirm('상품을 활성화 하시겠습니까?')) {
            await bulkUpdateIsSellable(selectedIds, true);
            initSelection();
            reload();
          }
        } catch (err) {
          message.error('실패했습니다. err - ' + err);
        }
      },
    },
    {
      text: '상품 비활성화',
      onClick: async () => {
        try {
          if (confirm('상품을 비활성화 하시겠습니까?')) {
            await bulkUpdateIsSellable(selectedIds, false);
            initSelection();
            reload();
          }
        } catch (err) {
          message.error('실패했습니다. err - ' + err);
        }
      },
    },
  ];

  return {itemsActions};
};
