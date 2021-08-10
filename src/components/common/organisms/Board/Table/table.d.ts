import {MutationTuple} from '@apollo/client';

export type TableActionType = {
  icon?: string;
  text?: string;
  handleClick?: (
    ids: number[],
    mutate?: (options?: MutationFunctionOptions) => Promise<FetchResult>,
  ) => Promise<void>;
  useTableAction?: () => MutationTuple;
  Component?: React.FunctionComponent<unknown>;
};