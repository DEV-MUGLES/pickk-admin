import moment from 'moment';

import PlacementPreview from './preview';
import Filter from '@src/components/organisms/Board/Filter';
import Table from '@src/components/organisms/Board/Table';
import Space from '@src/components/atoms/space';

import {itemInputs} from './inputs';
import {placementColumns, placementActions} from './table';
import {BoardProps} from '../props';

import {withBoardContext, useBoardContext} from '@src/contexts/Board';
import {usePlacementTable} from '@src/hooks/table/Placement';
import {parseTable} from '../order-items/table/data-parser';
import PlacementService from '@src/lib/services/Placement';
import {OrderStatus} from '@src/types';
import {message} from 'antd';

function PlacementBoard({title}: BoardProps) {
  const {tableData} = useBoardContext().state;

  const newPlacementActions = [
    {
      text: '발주확인',
      onClick: async (ids: number[]) => {
        if (
          !ids.every(
            id =>
              tableData.find(record => record.id === id).status ===
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
    ,
    ...placementActions,
  ];

  return (
    <>
      <PlacementPreview />
      <Space level={2} />
      <Filter title={title} inputs={itemInputs} />
      <Space level={2} />
      <Table
        title={title}
        columns={placementColumns}
        actions={newPlacementActions}
      />
    </>
  );
}

export default withBoardContext(
  PlacementBoard,
  {
    status: null,
    lookupDate: 'paid',
    startDate: moment()
      .subtract(1, 'months')
      .format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  },
  usePlacementTable,
  parseTable,
);
