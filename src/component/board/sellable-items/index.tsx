import {useState} from 'react';
import {ColumnsType} from 'antd/lib/table';
import {formatTable, ExcelColumnsType} from '@pickk/react-excel';

import Filter from '@src/components/organisms/Board/Filter';
import Table from '@src/components/organisms/Board/Table';
import SellableItemManageButtons from './table/manage-buttons';
import ItemInfoEditDrawer from './drawer/item-info-edit';
import ItemOptionStockEditDrawer from './drawer/option-stock-edit';
import ItemPriceEditDrawer from './drawer/price-edit';
import {Space} from '@src/components/atoms';

import {useBoardContext, withBoardContext} from '@src/contexts/Board';

import {BoardProps} from '../props';
import {sellableItemColumns, sellableItemActions} from './table';
import {sellableItemInputs} from './inputs';

import {ITEMS_QUERY} from '@src/operations/item/query';
import {Items_items} from '@src/operations/__generated__/Items';

type SellableItemsDrawerType = 'price' | 'optionStock' | 'info';

function SellableItemsBoard({title}: BoardProps) {
  const {
    action: {setSelectedRowId},
  } = useBoardContext();

  const [drawerVisible, setDrawerVisible] = useState<
    Record<SellableItemsDrawerType, boolean>
  >({
    price: false,
    optionStock: false,
    info: false,
  });

  const handleDrawerOpen =
    (name: SellableItemsDrawerType) => (open: boolean) => () => {
      setDrawerVisible({
        ...drawerVisible,
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
    </>
  );
}

export default withBoardContext(
  SellableItemsBoard,
  {isSellable: true},
  {
    gql: ITEMS_QUERY,
    dataName: 'items',
    filterName: 'itemFilter',
  },
  (tableData) => {
    const excelColumns = sellableItemColumns.map((column) => ({
      label: column.title.toString(),
      propName: column.key.toString(),
    }));
    const newExcelColumns: ExcelColumnsType<Items_items> = [
      ...excelColumns.slice(0, 2),
      {
        label: '카테고리',
        propName: 'category',
        mapValue: ({majorCategory, minorCategory}) =>
          `${majorCategory?.name ?? '-'}/${minorCategory?.name ?? '-'}`,
      },
      ...excelColumns.slice(3, 7),
      {
        label: '보유재고',
        propName: 'stock',
        mapValue: ({products}) =>
          products.reduce((acc, {stock}) => (acc += stock), 0),
      },
      ...excelColumns.slice(8, 10),
      {
        label: '안내메시지',
        propName: 'notice',
        mapValue: ({notice}) => notice?.message,
      },
      ...excelColumns.slice(11, 12),
      {
        label: '공홈링크',
        propName: 'link',
        mapValue: ({urls}) => urls.find((url) => url.isPrimary)?.url,
      },
    ];
    return formatTable(tableData, newExcelColumns);
  },
);
