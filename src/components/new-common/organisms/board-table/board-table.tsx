import styled from 'styled-components';
import {Table} from 'antd';
import {TableRowSelection} from 'antd/lib/table/interface';
import {palette} from '@pickk/design-token';

import BoardTableHeader from './header';
import BoardTableActions from './actions';

import {BoardTableProps} from './board-table.types';

const StyledWrapper = styled.div`
  padding: 0.4rem 0;

  background-color: ${palette.white};
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function BoardTable(props: BoardTableProps) {
  const propsWithDefault: BoardTableProps = {keyField: 'id', ...props};
  const {
    title,
    totalDataSize,
    dataSource,
    columns,
    excelColumns,
    selectedRowKeys,
    page,
    pageSize,
    keyField,
    actions,
    onPageChange,
    onPageSizeChange,
    onRefreshClick,
    onRowClick,
    onRowSelectionChange,
  } = propsWithDefault;

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
        {...propsWithDefault}
        {...(selectedRowKeys != null ? {rowSelection} : {})}
        dataSource={dataSource.map((v) => ({...v, key: v[keyField]}))}
        size="small"
        title={() => (
          <StyledTitleWrapper>
            <BoardTableHeader
              title={title}
              totalDataSize={totalDataSize}
              dataSource={dataSource}
              excelColumns={excelColumns ?? defaultExcelColumns}
              onRefreshClick={onRefreshClick}
            />
            {actions && (
              <BoardTableActions
                isDisabled={selectedRowKeys.length === 0}
                actions={actions}
              />
            )}
          </StyledTitleWrapper>
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
