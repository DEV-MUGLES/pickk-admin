import {useState} from 'react';
import {message} from 'antd';
import moment from 'moment';

import Preview from '../../components/organisms/Board/preview';
import Filter from '@src/components/organisms/Board/Filter';
import Table from '@src/components/organisms/Board/Table';
import ShipModal from './table/modal/ship';
import Space from '@src/components/atoms/space';
import StockSetModal from '../item/table/modal/stock/set';

import {placementInputs} from './inputs';
import {placementColumns, placementActions} from './table';
import {BoardProps} from '../props';
import {placementPreviewData} from './preview-data';
import {parseTable} from '../order-items/table/data-parser';

import PlacementService from '@src/lib/services/Placement';
import {OrderStatus} from '@src/types';

import {usePlacementTable} from '@src/hooks/table/Placement';
import {usePlacementPreview} from '@src/hooks';
import {withBoardContext, useBoardContext} from '@src/contexts/Board';

function PlacementBoard({title}: BoardProps) {
  const {tableData, selectedRowKeys} = useBoardContext().state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeStockModal = () => {
    setIndex(-1);
  };
  const [index, setIndex] = useState(-1);

  const modalData = tableData
    ? tableData.filter((data) => selectedRowKeys.includes(data.id))
    : null;

  const newPlacementActions = [
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
          return Promise.resolve(false);
        }
        await PlacementService.place(ids);
        return Promise.resolve(true);
      },
    },
    {
      text: '발송처리',
      onClick: async (ids: number[]) => {
        setIsModalOpen(true);
        return Promise.resolve(false);
      },
    },
    ...placementActions,
    {
      text: '주문 취소',
      onClick: async (nums: number[]) => {
        if (nums.length !== 1) {
          message.warning(
            '주문 일괄 취소는 지원하지 않습니다.\n1개의 주문건만 선택해주세요.',
          );
          return Promise.resolve(false);
        }
        try {
          await PlacementService.cancel(nums[0]);
          if (confirm('취소된 제품의 재고를 다시 설정하시겠습니까?')) {
            setIndex(nums[0]);
          }
          return Promise.resolve(true);
        } catch {
          return Promise.resolve(false);
        }
      },
    },
  ];

  return (
    <>
      <Preview
        data={placementPreviewData}
        usePreviewData={usePlacementPreview}
      />
      <Space level={2} />
      <Filter title={title} inputs={placementInputs} />
      <Space level={2} />
      <Table
        title={title}
        columns={placementColumns}
        actions={newPlacementActions}
      />
      <StockSetModal id={index} closeModal={closeStockModal} />
      <ShipModal {...{modalData, isModalOpen, closeModal}} />
    </>
  );
}

export default withBoardContext(
  PlacementBoard,
  {
    status: 'PAID',
    lookupDate: 'paid',
    startDate: moment().subtract(1, 'months').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  },
  usePlacementTable,
  parseTable,
);
