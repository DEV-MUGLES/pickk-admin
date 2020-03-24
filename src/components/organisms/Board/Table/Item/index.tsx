import {useState} from 'react';
import styled from 'styled-components';
import {Table, Divider} from 'antd';

import Header from '../Header';
import Footer, {TableFooterProps} from '../Footer';
import ActionBar, {TableActionBarProps} from '../ActionBar';
import Colors from '@src/components/atoms/colors';

export type BoardTableProps = {
  title: string;
  columns: Array<{title: string; key: string}>;
  // tslint:disable-next-line: no-any
  dataSource: any[];
  loading: boolean;
} & Pick<TableActionBarProps, 'actions'> &
  Pick<TableFooterProps, 'footActions'>;

export default function BoardTable({
  title,
  columns,
  dataSource,
  actions,
  footActions,
  loading,
}: BoardTableProps) {
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
        {...{columns, dataSource, rowSelection, loading}}
        tableLayout="fixed"
        columns={columns}
        scroll={{x: true}}
        size="small"
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

const DataTable = styled(Table)`
  width: 100%;
`;
