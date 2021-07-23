import React, {useState} from 'react';
import {Button, Typography} from 'antd';
import {ColumnsType} from 'antd/lib/table';
import {formatTable, ExcelColumnsType} from '@pickk/react-excel';

import Filter from '@src/components/organisms/Board/Filter';
import Table from '@src/components/organisms/Board/Table';
import Space from '@src/components/atoms/space';
import CategoryModal from './table/modal/category';

import {useBoardContext, withBoardContext} from '@src/contexts/Board';
import {BoardProps} from '../props';

import {itemInputs} from './inputs';
import {itemColumns, itemActions} from './table';

import {ITEMS_QUERY} from '@src/operations/item/query';
import {Items_items} from '@src/operations/__generated__/Items';

const {Text} = Typography;

function ItemBoard({title}: BoardProps) {
  const {
    action: {setSelectedRowId},
  } = useBoardContext();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleModalOpen = (open: boolean) => {
    setModalVisible(open);
  };

  const newItemColumns: ColumnsType<Items_items> = [
    ...itemColumns.slice(0, 3),
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
    ...itemColumns.slice(3),
  ];

  return (
    <>
      <Filter title={title} inputs={itemInputs} />
      <Space level={2} />
      <Table title={title} columns={newItemColumns} actions={itemActions} />
      {modalVisible && (
        <CategoryModal
          visible={modalVisible}
          onClose={() => handleModalOpen(false)}
        />
      )}
    </>
  );
}

export default withBoardContext(
  ItemBoard,
  {},
  {
    gql: ITEMS_QUERY,
    dataName: 'items',
    filterName: 'itemFilter',
  },
  (tableData) => {
    const excelColumns = itemColumns.map((column) => ({
      label: column.title.toString(),
      propName: column.key.toString(),
    }));
    const newExcelColumns: ExcelColumnsType<Items_items> = [
      ...excelColumns.slice(0, 1),
      ...excelColumns.slice(2, 3),
      {
        label: '카테고리',
        propName: 'category',
        mapValue: ({majorCategory, minorCategory}) =>
          `${majorCategory?.name ?? '-'}/${minorCategory?.name ?? '-'}`,
      },
      ...excelColumns.slice(4),
    ];
    return formatTable(tableData, newExcelColumns);
  },
);
