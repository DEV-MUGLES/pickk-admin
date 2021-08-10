import {useState} from 'react';
import {message} from 'antd';
import dayjs from 'dayjs';

import ExchangeRequestModal from './table/modal/exchangeRequest';
import Filter from '@src/components/common/organisms/Board/Filter';
import Table, {
  BoardTableProps,
} from '@src/components/common/organisms/Board/Table';
import Space from '@src/components/common/atoms/space';

import {withBoardContext, useBoardContext} from '@src/contexts/Board';
import {useOrderItemTable} from '@src/common/hooks/table/OrderItem';

import {orderItemInputs} from './inputs';
import {orderItemActions, orderItemColumns} from './table';
import {BoardProps} from '../props';
import {parseTable} from './table/data-parser';

function OrderItemBoard({
  title,
}: BoardProps & Omit<BoardTableProps, 'columns' | 'actions' | 'footActions'>) {
  const {state} = useBoardContext();
  const {tableData} = state;

  const [exchangeRequestIds, setExchangeRequestIds] = useState({
    id: -1,
    itemId: -1,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const newOrderItemActions = [
    ...orderItemActions,
    {
      text: '교환으로 변경',
      onClick: async (ids: number[]) => {
        if (ids.length !== 1) {
          message.warning(
            `교환으로 변경 일괄 처리는 지원하지 않습니다.\n1개의 주문건만 선택해주세요.`,
          );
          return Promise.resolve(false);
        }
        const record = tableData.find((row) => row.id === ids[0]);
        setExchangeRequestIds({
          id: ids[0],
          itemId: record.itemId,
        });
        setIsModalOpen(true);
        return Promise.resolve(false);
      },
    },
  ];

  return (
    <>
      <Filter title={title} inputs={orderItemInputs} />
      <Space level={2} />
      <Table
        title={title}
        columns={orderItemColumns}
        actions={newOrderItemActions}
      />
      <Space level={2} />
      {isModalOpen && (
        <ExchangeRequestModal
          {...exchangeRequestIds}
          {...{isModalOpen, closeModal}}
          claimed={false}
        />
      )}
    </>
  );
}

export default OrderItemBoard;
