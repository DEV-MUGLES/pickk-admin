import {useState} from 'react';
import {message} from 'antd';
import {OrderStatus} from '@pickk/common';

import Preview from '@src/components/common/organisms/Board/preview';
import Header from '../common/organisms/Board/Header';
import Filter from '@src/components/common/organisms/Board/Filter';
import Table from '@src/components/common/organisms/Board/Table';
import ShipModal from './table/modal/ship';
import StockSetModal from './table/modal/stock';

import {useBoardContext} from '@src/common/contexts/Board';
import {TableActionType} from '../common/organisms/Board/Table/table';
import {BoardProps} from '../props';

import {placementInputs} from './inputs';
import {placementColumns, placementActions} from './table';
import {placementPreviewData} from './preview-data';
import {
  usePlacementPreview,
  useBulkShipReadyMeSellerOrderItems,
  useShipMeSellerOrderItem,
  useCancelMeSellerOrderItem,
} from './hooks';

function PlacementBoard(props: BoardProps) {
  const {tableData, selectedRowKeys} = useBoardContext().state;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {bulkShipReadyMeSellerOrderItems} =
    useBulkShipReadyMeSellerOrderItems();
  const {shipMeSellerOrderItems} = useShipMeSellerOrderItem();
  const {cancelMeSellerOrderItem} = useCancelMeSellerOrderItem();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeStockModal = () => {
    setIndex(-1);
  };
  const [index, setIndex] = useState(-1);

  const newPlacementActions: TableActionType[] = [
    {
      text: '발주확인',
      onClick: async (ids: number[]) => {
        if (
          !ids.every(
            (id) =>
              tableData.find((record) => record.id === id).status ===
              OrderStatus.Paid,
          )
        ) {
          message.warning(
            "주문상태가 '결제 완료'인 주문만 발주확인할 수 있습니다.",
          );
          return;
        }

        const merchantUids = ids.map(
          (id) => tableData.find((record) => record.id === id).merchantUids,
        );
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
        setIsModalOpen(true);
      },
    },
    ...placementActions,
    {
      text: '주문 취소',
      onClick: async (ids: number[]) => {
        if (ids.length !== 1) {
          message.warning(
            '주문 일괄 취소는 지원하지 않습니다.\n1개의 주문건만 선택해주세요.',
          );
          return;
        }
        try {
          const selectedId = ids[0];
          const selectedData = tableData.find(
            (record) => record.id === selectedId,
          );
          const {merchantUid, amount, checksum, reason} = selectedData;
          await cancelMeSellerOrderItem(merchantUid, {
            amount,
            checksum,
            reason,
          });
          if (confirm('취소된 제품의 재고를 다시 설정하시겠습니까?')) {
            setIndex(
              tableData.find((record) => record.id === selectedId).itemId,
            );
          }
        } catch {}
      },
    },
    {
      text: '발송지연안내',
      onClick: async (ids: number[]) => {
        return;
      },
    },
  ];

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
        actions={newPlacementActions}
      />
      <StockSetModal id={index} closeModal={closeStockModal} />
      <ShipModal
        {...{
          modalData:
            tableData?.find((data) => selectedRowKeys[0] === data.id) ?? null,
          onSubmit: (shipment) => {
            shipMeSellerOrderItems(
              shipment.merchantUid,
              shipment.courierId,
              shipment.trackCode,
            );
          },
          isModalOpen,
          closeModal,
        }}
      />
    </>
  );
}

export default PlacementBoard;
