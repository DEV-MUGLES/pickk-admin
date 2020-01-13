import {useState} from 'react';
import {Table, Divider} from 'antd';

import Header from './Header';
import Footer, {TableFooterProps} from './Footer';
import ActionBar, {TableActionBarProps} from './ActionBar';
import styled from 'styled-components';
import Colors from '@src/components/atoms/colors';

export type BoardTableProps = {
  title: string;
  columns: Array<{title: string; key: string}>;
} & Pick<TableActionBarProps, 'actions'> &
  Pick<TableFooterProps, 'footActions'>;

export default function BoardTable({
  title,
  columns,
  actions,
  footActions,
}: BoardTableProps) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};

  const actionBarProps: TableActionBarProps = {
    ...{selectedRowKeys, actions},
  };
  const footerProps: TableFooterProps = {
    ...{selectedRowKeys, footActions},
  };

  const dataSource = [];
  for (let i = 1; i < 92; ++i) {
    dataSource.push({
      key: i,
      category: '맨투맨/스웨트셔츠',
      itemName: '기모 짱짱 맨투맨 (그레이)' + i,
      originalPrice: 39000 + i,
      salePrice: 19900 - i,
      subscriptionDiscount: 5 % i,
    });
  }

  return (
    <Wrapper>
      <Table
        {...{columns, dataSource, rowSelection}}
        columns={columns}
        size="small"
        tableLayout="fixed"
        title={() => (
          <>
            <Header {...{title, columns, dataSource}} />
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
