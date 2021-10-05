import {useState} from 'react';
import {message} from 'antd';
import {OrderItemStatus} from '@pickk/common';

import Preview from '@src/components/common/organisms/Board/preview';
import Header from '../common/organisms/Board/Header';
import Filter from '@src/components/common/organisms/Board/Filter';
import Table from '@src/components/common/organisms/Board/Table';

import ShipModal from './table/modal/ship';
import CancelOrderItemModal from './table/modal/cancel-order-item';

import {useBoardContext} from '@src/common/contexts/Board';
import {TableActionType} from '../common/organisms/Board/Table/table';
import {BoardProps} from '../props';

import {placementInputs} from './inputs';
import {
  placementColumns,
  placementExcelColumns,
  CSVBulkShipButton,
  ExcelBulkShipButton,
} from './table';
import {placementPreviewData} from './preview-data';
import {
  usePlacementPreview,
  useBulkShipReadyMeSellerOrderItems,
  useShipMeSellerOrderItem,
} from './hooks';

export type PlacementModalType = 'ship' | 'cancelOrderItem';

function PlacementBoard(props: BoardProps) {
  const {
    state: {tableData, selectedRowKeys},
    action: {reload},
  } = useBoardContext();
  const [isModalOpen, setIsModalOpen] = useState<
    Record<PlacementModalType, boolean>
  >({
    ship: false,
    cancelOrderItem: false,
  });

  const {bulkShipReadyMeSellerOrderItems} =
    useBulkShipReadyMeSellerOrderItems();
  const {shipMeSellerOrderItems} = useShipMeSellerOrderItem();

  const toggleOpenModal = (type: PlacementModalType, input: boolean) => () => {
    setIsModalOpen({...isModalOpen, [type]: input});
  };

  const newPlacementActions: TableActionType[] = [
    {
      text: '발주확인',
      onClick: async (merchantUids: string[]) => {
        if (
          !merchantUids.every(
            (id) =>
              tableData.find((record) => record.id === id).status ===
              OrderItemStatus.Paid,
          )
        ) {
          message.warning(
            "주문상태가 '결제 완료'인 주문만 발주확인할 수 있습니다.",
          );
          return;
        }

        await bulkShipReadyMeSellerOrderItems(merchantUids);
      },
    },
    {
      text: '발송처리',
      onClick: async (ids: number[]) => {
        if (ids.length !== 1) {
          message.warning(
            '일괄 발송처리는 엑셀로 지원합니다.\n1개의 주문건만 선택해주세요.',
          );
          return;
        }

        if (
          !(
            tableData.find((record) => record.id === ids[0]).status ===
            OrderItemStatus.ShipReady
          )
        ) {
          message.warning(
            "주문상태가 '배송준비중'상태인 주문만 발주확인할 수 있습니다.",
          );
          return;
        }

        toggleOpenModal('ship', true)();
        /** selectedRowKeys가 초기화 되기 때문에 reload를 하면 안된다. */
        return {reloading: false};
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
      onClick: async (ids: number[]) => {
        if (ids.length !== 1) {
          message.warning(
            '주문 일괄 취소는 지원하지 않습니다.\n1개의 주문건만 선택해주세요.',
          );
          return;
        }

        const isPaidOrderItem = ids.every(
          (id) =>
            tableData.find((record) => record.id === id).status ===
            OrderItemStatus.Paid,
        );
        if (!isPaidOrderItem) {
          message.warning(
            "주문상태가 '결제 완료'인 주문만 취소확인할 수 있습니다.",
          );
          return;
        }

        toggleOpenModal('cancelOrderItem', true)();

        return {reloading: false};
      },
    },
    // @TODO 추후 구현
    // {
    // text: '발송지연안내',
    // onClick: async (ids: number[]) => {
    //   return;
    // },
    // },
  ];

  const handleShipModalSubmit = async (shipment) => {
    try {
      await shipMeSellerOrderItems(
        shipment.merchantUid,
        shipment.courierId,
        shipment.trackCode,
      );

      message.success('적용되었습니다.');
    } catch (error) {
      message.error(`실패했습니다. - ${error}`);
    }
  };

  return (
    <>
      <Header {...props} />
      <Preview
        data={placementPreviewData}
        usePreviewData={usePlacementPreview}
      />
      <Filter {...props} inputs={placementInputs} />
      <Table
        {...props}
        columns={placementColumns}
        excelColumns={placementExcelColumns}
        actions={newPlacementActions}
      />
      <ShipModal
        isModalOpen={isModalOpen.ship}
        closeModal={toggleOpenModal('ship', false)}
        modalData={
          tableData?.find((record) => record.id === selectedRowKeys[0]) ?? null
        }
        onSubmit={handleShipModalSubmit}
      />
      <CancelOrderItemModal
        isModalOpen={isModalOpen.cancelOrderItem}
        closeModal={toggleOpenModal('cancelOrderItem', false)}
        merchantUid={
          tableData?.find((record) => record.id === selectedRowKeys[0])
            ?.merchantUid
        }
      />
    </>
  );
}

export default PlacementBoard;
