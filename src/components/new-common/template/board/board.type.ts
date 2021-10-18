import {PageInput} from '@pickk/common';

import {
  BoardFilterProps,
  BoardTableProps,
} from '@components/new-common/organisms';

export type BoardDataFetcher<
  DataType = object,
  FilterType = Record<string, unknown>,
> = ({
  pageInput,
  filter,
  query,
}: {
  pageInput: PageInput;
  filter?: FilterType;
  query?: string;
}) => {
  data: DataType[];
  total: number;
  loading: boolean;
  refetch: () => Promise<unknown>;
};

export type BoardTemplateProps<
  DataType = object,
  FilterType = Record<string, unknown>,
> = {
  title: string;
  subTitle: string;
  useBoardData: BoardDataFetcher<DataType, FilterType>;
  filterInputs?: BoardFilterProps['inputs'];
  /** @default 20 */
  defaultPageSize?: number;
} & Pick<BoardFilterProps, 'defaultFilter'> &
  Pick<
    BoardTableProps<DataType>,
    | 'onRowClick'
    | 'selectedRowKeys'
    | 'onRowSelectionChange'
    | 'columns'
    | 'excelColumns'
  >;
