import styled from 'styled-components';
import {Table, Divider, Modal, Icon, message} from 'antd';

import Header from './Header';
import Footer, {TableFooterProps} from './Footer';
import ActionBar, {TableActionBarProps} from './ActionBar';
import Colors from '@src/components/atoms/colors';

import {useBoardContext} from '@src/contexts/Board';
import ItemService from '@src/lib/services/Item';
import StockInitModal from '@src/board/item/table/modal/stock/init';
import {useState} from 'react';

const {confirm} = Modal;

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
  const {state, action} = useBoardContext();
  const {tableData, loading, selectedRowKeys} = state;
  const {reload, setSelectedRowKeys} = action;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOffClicked = async () => {
    confirm({
      title: '재고 관리 기능을 끄시겠습니까?',
      icon: <Icon type="ExclamationCircleOutlined" />,
      content: '모든 재고 수량이 0으로 초기화됩니다.',
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

  const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};
  const newItemActions = [
    {
      text: '재고관리 ON',
      onClick: async () => {
        setIsModalOpen(true);
        return Promise.resolve(false);
      },
    },
    {
      text: '재고관리 OFF',
      onClick: handleOffClicked,
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
      <StockInitModal {...{modalData, isModalOpen, closeModal}} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${Colors.White};
  display: flex;
  align-itmes: flex-start;
  text-align: left;
  width: calc(100vw - 232px);
`;

const DataTable = styled(Table)`
  width: 100%;
`;
