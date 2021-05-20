import {Filter} from '@src/types';
import {Dispatch, SetStateAction} from 'react';

export interface IBoard {
  state: {
    filter: Filter;
    newFilter: Filter;
    tableData: any;
    loading: boolean;
    defaultFilter: Filter;
    selectedRowKeys: number[];
  };
  action: {
    handleFilterChange: (data: Filter) => void;
    submitFilter: () => void;
    initFilter: () => void;
    reload: () => void;
    applyPreview: (data) => void;
    parseExcelData: any;
    setSelectedRowKeys: Dispatch<SetStateAction<number[]>>;
  };
}
