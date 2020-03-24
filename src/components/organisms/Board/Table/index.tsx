import {useState} from 'react';
import {Table, Divider} from 'antd';

import Header from './Header';
import Footer, {TableFooterProps} from './Footer';
import ActionBar, {TableActionBarProps} from './ActionBar';
import styled from 'styled-components';
import Colors from '@src/components/atoms/colors';
import {useBoardContext} from '@src/contexts/Board';

export type BoardTableProps = {
  // tslint:disable-next-line: no-any
} & Pick<TableActionBarProps, 'actions'> &
  Pick<TableFooterProps, 'footActions'>;

export default function BoardTable({actions, footActions}: BoardTableProps) {
  const {state, action} = useBoardContext();
  const {tableData, loading} = state;

  const title = '상품 조회';

  const columns = [
    {
      title: '상품명',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '정가',
      dataIndex: 'originalPrice',
      key: 'originalPrice',
    },
    {
      title: '할인가',
      dataIndex: 'salePrice',
      key: 'salePrice',
    },
    {
      title: 'SKU일련번호',
      dataIndex: 'skuPrefix',
      key: 'skuPrefix',
    },
    {
      title: '구독할인율',
      dataIndex: 'subsDiscountRate',
      key: 'subsDiscountRate',
    },
    {
      title: '리뷰 수',
      dataIndex: 'reviewCount',
      key: 'reviewCount',
    },
    {
      title: '구매 수',
      dataIndex: 'purchasedCount',
      key: 'purchasedCount',
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};

  const actionBarProps: TableActionBarProps = {
    ...{selectedRowKeys, actions},
  };
  const footerProps: TableFooterProps = {
    ...{selectedRowKeys, footActions},
  };

  return (
    <Wrapper>
      <DataTable
        {...{columns, dataSource: tableData, rowSelection, loading}}
        tableLayout="fixed"
        columns={columns}
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
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${Colors.White};
  display: flex;
  align-itmes: flex-start;
  text-align: left;
`;

const DataTable = styled(Table)`
  width: 100%;
`;
