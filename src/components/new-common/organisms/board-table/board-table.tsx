import styled from 'styled-components';
import {Table} from 'antd';
import {TableRowSelection} from 'antd/lib/table/interface';
import {palette} from '@pickk/design-token';

import BoardTableHeader from './header';

import {BoardTableProps} from './board-table.types';

const StyledWrapper = styled.div`
  padding: 0.4rem 0;

  background-color: ${palette.white};
`;

export default function BoardTable(props: BoardTableProps) {
  const {
    title,
    totalDataSize,
    dataSource,
    columns,
    excelColumns,
    selectedRowKeys,
    page,
    pageSize,
    onPageChange,
    onPageSizeChange,
    onRefreshClick,
    onRowClick,
    onRowSelectionChange,
  } = props;

  const rowSelection: TableRowSelection<unknown> = {
    selectedRowKeys,
    onChange: onRowSelectionChange,
  };

  const defaultExcelColumns = columns.map(({title, key}) => ({
    label: title.toString(),
    propName: key.toString(),
  }));

  return (
    <StyledWrapper>
      <Table
        {...props}
        {...(selectedRowKeys != null ? {rowSelection} : {})}
        dataSource={dataSource.map((v) => ({...v, key: v.id}))}
        size="small"
        title={() => (
          <BoardTableHeader
            title={title}
            totalDataSize={totalDataSize}
            dataSource={dataSource}
            excelColumns={excelColumns ?? defaultExcelColumns}
            onRefreshClick={onRefreshClick}
          />
        )}
        pagination={{
          total: totalDataSize,
          current: page,
          pageSize,
          position: ['bottomCenter'],
          onChange: onPageChange,
          onShowSizeChange: (_, size) => onPageSizeChange(size),
        }}
        scroll={{x: true}}
        onRow={(record) => ({
          onClick: () => onRowClick(record),
        })}
      />
    </StyledWrapper>
  );
}
