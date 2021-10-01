import {useState} from 'react';
import {message} from 'antd';

import Preview from '@src/components/common/organisms/Board/preview';
import Header from '@src/components/common/organisms/Board/Header';
import Filter from '@src/components/common/organisms/Board/Filter';
import Table from '@src/components/common/organisms/Board/Table';

import {TrackCodeUpdateModal} from './table/modal';

import {useBoardContext} from '@src/common/contexts/Board';
import {orderItemInputs} from '../order-items/inputs';
import {shipmentsColumns} from './table/columns';
import {BoardProps} from '../props';
import {TableActionType} from '../common/organisms/Board/Table/table';

import {useShipmentPreview} from './hooks';

import {shipmentPreviewData} from './preview-data';

function ShipmentBoard(props: BoardProps) {
  const {
    state: {tableData, selectedRowKeys},
  } = useBoardContext();
  const firstSelectedRowData = tableData.find(
    (record) => record.id === selectedRowKeys[0],
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleUpdateTrackCodeClick = async (ids: number[]) => {
    if (ids.length !== 1) {
      message.warning(
        '일괄 수정은 지원하지 않습니다.\n1개의 주문건만 선택해주세요.',
      );
      return;
    }

    const selectedData = tableData.find(
      (record) => record.id === selectedRowKeys[0],
    );
    if (!selectedData?.shipment) {
      message.warning('배송정보가 존재하지 않는 송장은 수정할 수 없습니다.');
      return;
    }

    setIsModalOpen(true);
    return {reloading: false};
  };

  const placementActions: TableActionType[] = [
    {text: '송장수정', onClick: handleUpdateTrackCodeClick},
  ];

  return (
    <>
      <Header {...props} />
      <Preview data={shipmentPreviewData} usePreviewData={useShipmentPreview} />
      <Filter {...props} inputs={orderItemInputs} />
      <Table {...props} columns={shipmentsColumns} actions={placementActions} />
      {isModalOpen && (
        <TrackCodeUpdateModal
          visible={isModalOpen}
          onClose={handleModalClose}
          merchantUid={firstSelectedRowData?.merchantUid}
          defaultTrackCode={firstSelectedRowData?.shipment?.trackCode}
        />
      )}
    </>
  );
}

export default ShipmentBoard;
