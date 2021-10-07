import {useState} from 'react';
import {Button, Typography} from 'antd';
import {ColumnsType} from 'antd/lib/table';
import {Item} from '@pickk/common';

import Header from '@src/components/common/organisms/Board/Header';
import Filter from '@src/components/common/organisms/Board/Filter';
import Table from '@src/components/common/organisms/Board/Table';
import SellableItemManageButtons from './table/manage-buttons';
import ItemInfoEditDrawer from './drawer/item-info-edit';
import ItemOptionStockEditDrawer from './drawer/option-stock-edit';
import ItemPriceEditDrawer from './drawer/price-edit';
import CategoryModal from '../items/table/modal/category';

import {useBoardContext} from '@src/common/contexts/Board';
import {BoardProps} from '../props';

import {
  sellableItemColumns,
  sellableItemActions,
  sellableItemExcelColumns,
} from './table';
import {sellableItemInputs} from './inputs';

const {Text} = Typography;

type SellableItemsDrawerType = 'price' | 'optionStock' | 'info';

function SellableItemsBoard(props: BoardProps) {
  const {
    action: {setSelectedRowId},
  } = useBoardContext();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [drawerVisible, setDrawerVisible] = useState<
    Record<SellableItemsDrawerType, boolean>
  >({
    price: false,
    optionStock: false,
    info: false,
  });

  const handleModalOpen = (open: boolean) => {
    setModalVisible(open);
  };

  const handleDrawerOpen =
    (name: SellableItemsDrawerType) => (open: boolean) => () => {
      setDrawerVisible({
        ...drawerVisible,
        [name]: open,
      });
    };

  const newSellableItemColumns: ColumnsType<Item> = [
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
                handleDrawerOpen('price')(true)();
              },
            },
            {
              label: '옵션/재고 관리',
              onClick: () => {
                setSelectedRowId(id);
                handleDrawerOpen('optionStock')(true)();
              },
            },
            {
              label: '정보 수정',
              onClick: () => {
                setSelectedRowId(id);
                handleDrawerOpen('info')(true)();
              },
            },
          ]}
        />
      ),
    },
    ...sellableItemColumns.slice(1, 2),
    {
      title: '카테고리',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      align: 'center',
      render: (_, {id, majorCategory, minorCategory}) => {
        return (
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Text>{`${majorCategory?.name ?? '-'}/${
              minorCategory?.name ?? '-'
            }`}</Text>
            <Button
              size="small"
              onClick={() => {
                setSelectedRowId(id);
                handleModalOpen(true);
              }}
              style={{marginTop: '0.6rem'}}>
              수정
            </Button>
          </div>
        );
      },
    },
    ...sellableItemColumns.slice(2),
  ];

  return (
    <>
      <Header {...props} />
      <Filter {...props} inputs={sellableItemInputs} />
      <Table
        {...props}
        columns={newSellableItemColumns}
        excelColumns={sellableItemExcelColumns}
        actions={sellableItemActions}
      />
      <ItemPriceEditDrawer
        visible={drawerVisible.price}
        onClose={handleDrawerOpen('price')(false)}
      />
      <ItemOptionStockEditDrawer
        visible={drawerVisible.optionStock}
        onClose={handleDrawerOpen('optionStock')(false)}
      />
      <ItemInfoEditDrawer
        visible={drawerVisible.info}
        onClose={handleDrawerOpen('info')(false)}
      />
      {modalVisible && (
        <CategoryModal
          visible={modalVisible}
          onClose={() => handleModalOpen(false)}
        />
      )}
    </>
  );
}

export default SellableItemsBoard;
