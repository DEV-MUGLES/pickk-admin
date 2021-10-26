import {Key} from 'react';
import {TableProps} from 'antd';
import {TableRowSelection} from 'antd/lib/table/interface';
import {ExcelColumnsType} from '@pickk/react-excel';

import {TableActionType} from './actions';

export type BoardTableProps<DataType = object & {id?: Key}> = Pick<
  TableProps<DataType>,
  'dataSource' | 'loading' | 'columns'
> & {
  title: string;
  totalDataSize: number;
  page: number;
  pageSize: number;
  defaultPageSize?: number;
  keyField?: string;
  selectedRowKeys?: Key[];
  excelColumns?: ExcelColumnsType<DataType>;
  actions?: TableActionType[];
  onRefreshClick: () => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  onRowClick?: (record: DataType) => void;
  onRowSelectionChange?: TableRowSelection<DataType>['onChange'];
  useExcelData?: () => {data: DataType[]; loading: boolean};
};
