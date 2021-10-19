import {message} from 'antd';
import {OrderItemStatus, Shipment} from '@pickk/common';

import {TableActionType} from '@components/new-common/organisms/board-table/actions';
import {CSVBulkShipButton, ExcelBulkShipButton} from '@components/placements';

import {useToggleModals} from '@common/hooks';
import {
  useBulkShipReadyOrderItems,
  useShipOrderItem,
  useCancelOrderItem,
} from '@components/placements/table/actions';

import {FlattenPlacementDataType} from './use-placements';

export const usePlacementActions = ({
  selectedMerchantUids,
  selectedRecords,
  initSelection,
  reload = () => null,
}: {
  selectedMerchantUids: string[];
  selectedRecords: FlattenPlacementDataType[];
  initSelection: () => void;
  reload: () => void;
}) => {
  const {isModalOpen, openModal, closeModal} = useToggleModals([
    'ship',
    'cancelOrderItem',
  ]);

  const {bulkShipReadyOrderItems} = useBulkShipReadyOrderItems();
  const {shipOrderItem} = useShipOrderItem();
  const {cancelOrderItem} = useCancelOrderItem();

  const placementActions: TableActionType[] = [
    {
      text: '발주확인',
      onClick: async () => {
        if (
          !selectedRecords.every(({status}) => status === OrderItemStatus.Paid)
        ) {
          message.warning(
            "주문상태가 '결제 완료'인 주문만 발주확인할 수 있습니다.",
          );
          return;
        }
        try {
          await bulkShipReadyOrderItems(selectedMerchantUids);

          message.success(`발주확인 완료되었습니다.`);
          initSelection();
          reload();
        } catch (err) {
          message.error('실패했습니다. - ' + err);
        }
      },
    },
    {
      text: '발송처리',
      onClick: async () => {
        if (selectedMerchantUids.length !== 1) {
          message.warning(
            '일괄 발송처리는 엑셀로 지원합니다.\n1개의 주문건만 선택해주세요.',
          );
          return;
        }

        if (!(selectedRecords[0].status === OrderItemStatus.ShipReady)) {
          message.warning(
            "주문상태가 '배송준비중'상태인 주문만 발주확인할 수 있습니다.",
          );
          return;
        }

        openModal('ship');
      },
    },
    {
      Component: () => <CSVBulkShipButton reload={reload} />,
    },
    {
      Component: () => <ExcelBulkShipButton reload={reload} />,
    },
    {
      text: '주문 취소',
      onClick: async () => {
        if (selectedMerchantUids.length !== 1) {
          message.warning(
            '주문 일괄 취소는 지원하지 않습니다.\n1개의 주문건만 선택해주세요.',
          );
          return;
        }

        const isPaidOrderItem = selectedRecords.every(
          ({status}) =>
            status === OrderItemStatus.Paid ||
            status === OrderItemStatus.ShipReady,
        );
        if (!isPaidOrderItem) {
          message.warning(
            "주문상태가 '결제 완료' 또는 '배송준비중'인 주문상품만 취소처리할 수 있습니다.",
          );
          return;
        }

        openModal('cancelOrderItem');
      },
    },
    // @TODO '발송지연안내'
  ];

  const handleShipModalSubmit = async (
    shipment: Pick<Shipment, 'courierId' | 'trackCode'> & {merchantUid: string},
  ) => {
    try {
      await shipOrderItem(
        shipment.merchantUid,
        shipment.courierId,
        shipment.trackCode,
      );

      message.success('적용되었습니다.');
      closeModal('ship');
      initSelection();
      reload();
    } catch (error) {
      message.error(`실패했습니다. - ${error}`);
    }
  };

  const handleCancelOrderItemModalSubmit = async (
    merchantUid: string,
    restock: boolean,
  ) => {
    try {
      await cancelOrderItem(merchantUid, restock);

      message.success(`취소 완료되었습니다.`);
      closeModal('cancelOrderItem');
      initSelection();
      reload();
    } catch (error) {
      message.error('실패했습니다. - ' + error);
    }
  };

  return {
    placementActions,
    isShipModalOpen: isModalOpen.ship,
    isCancelOrderItemModalOpen: isModalOpen.cancelOrderItem,
    closeShipModal: () => closeModal('ship'),
    closeCancelOrderItemModal: () => closeModal('cancelOrderItem'),
    handleShipModalSubmit,
    handleCancelOrderItemModalSubmit,
  };
};
