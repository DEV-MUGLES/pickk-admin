import {MutationTuple} from '@apollo/client';

export type TableActionType = {
  icon?: string;
  text?: string;
  onClick?: (
    ids: number[],
    mutate?: (options?: MutationFunctionOptions) => Promise<FetchResult>,
  ) => Promise<{reloading?: boolean} | void>;
  useTableAction?: () => MutationTuple;
  Component?: React.FunctionComponent<unknown>;
};
