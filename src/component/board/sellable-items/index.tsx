import {useState} from 'react';
import {ColumnsType} from 'antd/lib/table';

import Filter from '@src/components/organisms/Board/Filter';
import Table from '@src/components/organisms/Board/Table';
import {Space} from '@src/components/atoms';
import SellableItemManageButtons from './table/manage-buttons';
import ItemInfoEditModal from './modal/info-edit';

import {useBoardContext, withBoardContext} from '@src/contexts/Board';

import {BoardProps} from '../props';
import {sellableItemColumns, sellableItemActions} from './table';
import {sellableItemInputs} from './inputs';

import {ITEMS_QUERY} from '@src/operations/item/query';
import {Items_items} from '@src/operations/__generated__/Items';

type SellableItemsModalType = 'price' | 'optionStock' | 'info';

function SellableItemsBoard({title}: BoardProps) {
  const {
    action: {setSelectedRowId},
  } = useBoardContext();

  const [modalVisible, setModalVisible] = useState<
    Record<SellableItemsModalType, boolean>
  >({
    price: false,
    optionStock: false,
    info: false,
  });

  const handleModalOpen =
    (name: SellableItemsModalType) => (open: boolean) => () => {
      setModalVisible({
        ...modalVisible,
        [name]: open,
      });
    };

  const newSellableItemColumns: ColumnsType<Items_items> = [
    ...sellableItemColumns.slice(0, 1),
    {
      title: '상품 관리',
      dataIndex: 'itemManage',
      key: 'itemManage',
      width: 100,
      render: (_, {id}) => (
        <SellableItemManageButtons
          buttons={[
            {
              label: '가격 관리',
              onClick: () => {
                setSelectedRowId(id);
                handleModalOpen('price')(true)();
              },
            },
            {
              label: '옵션/재고 관리',
              onClick: () => {
                setSelectedRowId(id);
                handleModalOpen('optionStock')(true)();
              },
            },
            {
              label: '정보 수정',
              onClick: () => {
                setSelectedRowId(id);
                handleModalOpen('info')(true)();
              },
            },
          ]}
        />
      ),
    },
    ...sellableItemColumns.slice(1),
  ];

  return (
    <>
      <Filter title={title} inputs={sellableItemInputs} />
      <Space level={2} />
      <Table
        title={title}
        columns={newSellableItemColumns}
        actions={sellableItemActions}
      />
      <ItemInfoEditModal
        visible={modalVisible.info}
        onClose={handleModalOpen('info')(false)}
      />
    </>
  );
}

export default withBoardContext(
  SellableItemsBoard,
  {isSellable: true},
  {
    gql: ITEMS_QUERY.gql,
    dataName: ITEMS_QUERY.dataName,
    filterName: 'itemFilter',
  },
  (v) => v,
);
