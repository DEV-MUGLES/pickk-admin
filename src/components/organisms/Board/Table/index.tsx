import {useState} from 'react';
import styled from 'styled-components';
import {Table, Divider} from 'antd';

import Header from './Header';
import Footer, {TableFooterProps} from './Footer';
import ActionBar, {TableActionBarProps} from './ActionBar';
import Colors from '@src/components/atoms/colors';

import {useBoardContext} from '@src/contexts/Board';
import ItemService from '@src/lib/services/Item';
import StockInitModal from '@src/board/item/table/modal/stock/init';

export type BoardTableProps = {
  // tslint:disable-next-line: no-any
  title: string;
  columns: any;
} & Pick<TableActionBarProps, 'actions'> &
  Pick<TableFooterProps, 'footActions'>;

export default function BoardTable({
  title,
  columns,
  actions,
  footActions,
}: BoardTableProps) {
  const {state} = useBoardContext();
  const {tableData, loading} = state;

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};
  const newItemActions = [
    {
      text: '재고관리 ON',
      onClick: async (ids: number[]) => {
        await ItemService.manageStock(true, ids);
        setIsModalOpen(true);
      },
    },
    ...actions,
  ];

  const actionBarProps: TableActionBarProps = {
    ...{selectedRowKeys, actions: newItemActions},
  };
  const footerProps: TableFooterProps = {
    ...{selectedRowKeys, footActions},
  };

  let modalData = [];
  if (tableData)
    modalData = tableData.filter(data => selectedRowKeys.includes(data.id));

  return (
    <Wrapper>
      <DataTable
        {...{columns, dataSource: tableData, rowSelection, loading}}
        scroll={{x: true}}
        size="small"
        title={() => (
          <>
            <Header {...{title, columns, dataSource: tableData}} />
            {actions && (
              <>
                <Divider style={{fontSize: 10}} />
                <ActionBar {...actionBarProps} />
              </>
            )}
          </>
        )}
        footer={footActions ? () => <Footer {...footerProps} /> : null}
        pagination={{position: 'bottom'}}
      />
      {isModalOpen && (
        <StockInitModal {...{modalData, isModalOpen, closeModal}} />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${Colors.White};
  display: flex;
  align-itmes: flex-start;
  text-align: left;
  width: calc(100vw - 250px);
`;

const DataTable = styled(Table)`
  width: 100%;
`;
