import {QueryResult} from '@apollo/client';

export type DataFetchConfig = {
  useBoardData: (options?) => QueryResult;
  operationName: string;
  filterName: string;
  defaultFilter?: Filter;
};

export type Filter = Record<string, any>;
