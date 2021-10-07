import {useState} from 'react';
import {message} from 'antd';
import {ColumnsType} from 'antd/lib/table';
import {Item} from '@pickk/common';

import Header from '@src/components/common/organisms/Board/Header';
import Filter from '@src/components/common/organisms/Board/Filter';
import Table from '@src/components/common/organisms/Board/Table';
import SellableItemManageButtons from './table/manage-buttons';
import {CategoryRenderer} from '@src/components/items/table/renderers';
import ItemInfoEditDrawer from './drawer/item-info-edit';
import ItemOptionStockEditDrawer from './drawer/option-stock-edit';
import ItemPriceEditDrawer from './drawer/price-edit';
import {CategoryModal} from '../items/table/modal';

import {useBoardContext} from '@src/common/contexts/Board';
import {TableActionType} from '../common/organisms/Board/Table/table';
import {BoardProps} from '../props';

import {
  useBulkUpdateIsMdRecommended,
  useBulkUpdateIsSellable,
} from './table/hooks';
import {sellableItemColumns, sellableItemExcelColumns} from './table';
import {sellableItemInputs} from './inputs';

type SellableItemsDrawerType = 'price' | 'optionStock' | 'info';

function SellableItemsBoard(props: BoardProps) {
  const {
    action: {setSelectedRowId},
  } = useBoardContext();

  const {bulkUpdateIsMdRecommended} = useBulkUpdateIsMdRecommended();
  const {bulkUpdateIsSellable} = useBulkUpdateIsSellable();

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
      render: (_, {id, majorCategory, minorCategory}) => (
        <CategoryRenderer
          majorCategoryName={majorCategory?.name}
          minorCategoryName={minorCategory?.name}
          onUpdateClick={() => {
            setSelectedRowId(id);
            handleModalOpen(true);
          }}
        />
      ),
    },
    ...sellableItemColumns.slice(2),
  ];

  const sellableItemActions: TableActionType[] = [
    {
      text: 'MD추천 ON',
      onClick: async (ids: number[]) => {
        try {
          if (confirm('MD 추천 상품으로 설정합니다.')) {
            await bulkUpdateIsMdRecommended(ids, true);
          }
        } catch (err) {
          message.error('실패했습니다. err - ' + err);
        }
      },
    },
    {
      text: 'MD추천 OFF',
      onClick: async (ids: number[]) => {
        try {
          if (confirm('MD 추천 상품을 해제합니다.')) {
            await bulkUpdateIsMdRecommended(ids, false);
          }
        } catch (err) {
          message.error('실패했습니다. err - ' + err);
        }
      },
    },
    {
      text: '상품 비활성화',
      onClick: async (ids: number[]) => {
        try {
          if (confirm('상품을 비활성화 하시겠습니까?')) {
            await bulkUpdateIsSellable(ids, false);
          }
        } catch (err) {
          message.error('실패했습니다. err - ' + err);
        }
      },
    },
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
