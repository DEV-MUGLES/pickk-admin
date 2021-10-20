import {message} from 'antd';

import {TableActionType} from '@components/new-common/organisms/board-table/actions';
import {
  useBulkUpdateIsMdRecommended,
  useBulkUpdateIsSellable,
} from '@components/sellable-items/table';

export const useSellableItemsActions = ({
  selectedIds,
  initSelection,
  reload,
}: {
  selectedIds: number[];
  initSelection: () => void;
  reload: () => void;
}) => {
  const {bulkUpdateIsMdRecommended} = useBulkUpdateIsMdRecommended();
  const {bulkUpdateIsSellable} = useBulkUpdateIsSellable();

  const sellableItemsActions: TableActionType[] = [
    {
      text: 'MD추천 ON',
      onClick: async () => {
        try {
          if (confirm('MD 추천 상품으로 설정합니다.')) {
            await bulkUpdateIsMdRecommended(selectedIds, true);
            initSelection();
            reload();
          }
        } catch (err) {
          message.error('실패했습니다. err - ' + err);
        }
      },
    },
    {
      text: 'MD추천 OFF',
      onClick: async () => {
        try {
          if (confirm('MD 추천 상품을 해제합니다.')) {
            await bulkUpdateIsMdRecommended(selectedIds, false);
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

  return {sellableItemsActions};
};
