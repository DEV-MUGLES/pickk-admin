import {ReactNode} from 'react';
import {QueryResult} from '@apollo/client';

export type Filter = Record<string, any>;
export type DataFetchConfig = {
  useBoardData: (options?) => QueryResult;
  operationName: string;
  filterName: string;
  defaultFilter?: Filter;
  mapRecord?: (record) => Record<string, unknown>;

  // @TODO refactor
  filterRecord?: (record) => boolean;
};

export type BoardStoreProviderProps = {
  children: ReactNode;
  dataFetchConfig: DataFetchConfig;
  parseExcelData?: (data: unknown) => unknown;
};
