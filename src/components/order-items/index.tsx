import {useState} from 'react';
import {message} from 'antd';

import ExchangeRequestModal from './table/modal/exchangeRequest';
import Header from '../common/organisms/Board/Header';
import Filter from '../common/organisms/Board/Filter';
import Table, {BoardTableProps} from '../common/organisms/Board/Table';

import {useBoardContext} from '@src/common/contexts/Board';

import {orderItemInputs} from './inputs';
import {orderItemActions, orderItemColumns} from './table';
import {BoardProps} from '../props';

function OrderItemBoard(props: BoardProps) {
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
      <Header {...props} />
      <Filter {...props} inputs={orderItemInputs} />
      <Table
        {...props}
        columns={orderItemColumns}
        actions={newOrderItemActions}
      />
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
