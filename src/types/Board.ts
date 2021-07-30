import {QueryResult} from '@apollo/client';

export type DataFetchConfig = {
  useBoardData: (options?) => QueryResult;
  dataName: string;
  filterName: string;
  defaultFilter?: Filter;
};

export type Filter = Record<string, any>;
