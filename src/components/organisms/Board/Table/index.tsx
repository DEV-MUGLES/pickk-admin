import React, {useState} from 'react';
import styled from 'styled-components';
import {Table, Divider} from 'antd';

import Header from './Header';
import Footer, {TableFooterProps} from './Footer';
import ActionBar, {TableActionBarProps} from './ActionBar';
import {WHITE} from '@src/components/atoms/colors';

import {useBoardContext} from '@src/contexts/Board';

export type BoardTableProps = {
  title: string;
  // tslint:disable-next-line: no-any
  columns: any;
} & Pick<TableActionBarProps, 'actions'> &
  Pick<TableFooterProps, 'footActions'>;

function BoardTable({title, columns, actions, footActions}: BoardTableProps) {
  const {state, action} = useBoardContext();
  const {tableData, loading, selectedRowKeys} = state;
  const {setSelectedRowKeys} = action;

  const [pageSize, setPageSize] = useState(10);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  const footerProps: TableFooterProps = {
    ...{selectedRowKeys, footActions},
  };

  return (
    <Wrapper>
      <DataTable
        {...{columns, dataSource: tableData, rowSelection, loading}}
        scroll={{x: true}}
        size="small"
        title={() => (
          <TitleWrapper>
            <Header
              {...{
                title,
                columns,
                dataSource: tableData,
              }}
            />
            {actions && (
              <>
                <Divider style={{margin: '12px 0'}} />
                <ActionBar
                  {...{
                    selectedRowKeys,
                    actions,
                    pageSize,
                    setPageSize,
                  }}
                />
              </>
            )}
          </TitleWrapper>
        )}
        footer={footActions ? () => <Footer {...footerProps} /> : null}
        pagination={{position: ['bottomRight'], pageSize}}
      />
    </Wrapper>
  );
}

export default React.memo(BoardTable);

const Wrapper = styled.div`
  background-color: ${WHITE};
  display: flex;
  align-itmes: flex-start;
  text-align: left;
`;

const DataTable = styled(Table)`
  width: 100%;
`;

const TitleWrapper = styled.div`
  padding: 6px 16px;
`;
