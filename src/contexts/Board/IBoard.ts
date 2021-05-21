import {Dispatch, SetStateAction} from 'react';

import {Filter} from '@src/types';

export interface IBoard {
  state: {
    filter: Filter;
    newFilter: Filter;
    tableData: any;
    loading: boolean;
    defaultFilter: Filter;
    selectedRowKeys: number[];
    selectedData: any;
  };
  action: {
    handleFilterChange: (data: Filter) => void;
    submitFilter: () => void;
    initFilter: () => void;
    reload: () => void;
    applyPreview: (data) => void;
    parseExcelData: any;
    setSelectedRowKeys: Dispatch<SetStateAction<number[]>>;
    setSelectedData: Dispatch<SetStateAction<any>>;
  };
}
