import {useState} from 'react';
import {Typography, Button, Modal, Icon, message} from 'antd';

import Filter from '@src/components/organisms/Board/Filter';
import Table, {BoardTableProps} from '@src/components/organisms/Board/Table';
import Space from '@src/components/atoms/space';

import {withBoardContext, useBoardContext} from '@src/contexts/Board';
import {useItemTable} from '@src/hooks/table/Item';

import {itemInputs} from './inputs';
import {itemColumns, itemActions} from './table';
import {BoardProps} from '../props';
import StockSetModal from './table/modal/stock/set';
import ItemService from '@src/lib/services/Item';
import StockInitModal from './table/modal/stock/init';
import SubsDiscountRateModal from './table/modal/subs-discount-rate';

const {Text} = Typography;
const {confirm} = Modal;

function ItemBoard({
  title,
}: BoardProps & Omit<BoardTableProps, 'columns' | 'actions' | 'footActions'>) {
  const {state, action} = useBoardContext();
  const {tableData, selectedRowKeys} = state;
  const {reload} = action;

  const [index, setIndex] = useState(-1);
  const openModal = setIndex;
  const closeModal = () => {
    setIndex(-1);
  };

  const [isInitModalOpen, setInitModalOpen] = useState(false);
  const closeInitModal = () => {
    setInitModalOpen(false);
  };

  const [discountModal, setDiscountModal] = useState(false);

  const newItemColumns = [
    ...itemColumns,
    {
      title: '재고관리',
      dataIndex: 'isStockManaged',
      key: 'isStockManaged',
      sorter: (a, b) => a.isStockManaged > b.isStockManaged,
      width: 60,
      render: (value, record) => {
        const {id} = record;
        if (!value) {
          return <Text type="secondary">OFF</Text>;
        }
        return (
          <Button size="small" onClick={() => openModal(id)}>
            재고관리
          </Button>
        );
      },
    },
  ];

  const handleOffClicked = async () => {
    confirm({
      title: '재고 관리 기능을 끄시겠습니까?',
      icon: <Icon type="ExclamationCircleOutlined" />,
      content: '다시 ON 하실 땐 모든 재고 수량을 다시 설정하셔야합니다.',
      okText: '예',
      okType: 'danger',
      cancelText: '아니오',
      async onOk() {
        await ItemService.manageStockOff(selectedRowKeys);
        message.success('완료되었습니다.');
        reload();
      },
      onCancel() {
        message.warning('취소되었습니다.');
      },
    });
    return Promise.resolve(false);
  };

  const newItemActions = [
    {
      text: '재고관리 ON',
      onClick: async () => {
        setInitModalOpen(true);
        return Promise.resolve(false);
      },
    },
    {
      text: '재고관리 OFF',
      onClick: handleOffClicked,
    },
    {
      text: '구독 할인 설정',
      onClick: (ids: number[]) => {
        setDiscountModal(true);
        return Promise.resolve(false);
      },
    },
  ];

  const modalData = tableData
    ? tableData.filter(data => selectedRowKeys.includes(data.id))
    : null;

  return (
    <>
      <Filter title={title} inputs={itemInputs} />
      <Space level={2} />
      <Table title={title} columns={newItemColumns} actions={newItemActions} />
      <StockSetModal id={index} closeModal={closeModal} />
      <Space level={2} />
      <StockInitModal {...{modalData, isInitModalOpen, closeInitModal}} />
      <SubsDiscountRateModal
        visible={discountModal}
        onClose={() => {
          setDiscountModal(false);
        }}
        modalData={modalData}
      />
    </>
  );
}

export default withBoardContext(
  ItemBoard,
  {name: null, isReviewed: false},
  useItemTable,
  v => v,
);
