import {Key} from 'react';
import {TableProps} from 'antd';
import {ExcelColumnsType} from '@pickk/react-excel';

export type BoardTableProps<DataType = object & {id?: Key}> = Pick<
  TableProps<DataType>,
  'dataSource' | 'loading' | 'columns'
> & {
  title: string;
  totalDataSize: number;
  page: number;
  pageSize: number;
  defaultPageSize?: number;
  selectedRowKeys?: Key[];
  excelColumns?: ExcelColumnsType<DataType>;
  onRefreshClick: () => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onRowClick?: (record: DataType) => void;
  onRowSelectionChange?: (selectedRowKeys: Key[]) => void;
};