import {OperationType} from '@src/operations/type';

export type TableActionType = {
  icon?: string;
  text?: string;
  onClick?: (
    ids: number[],
    mutate?: (
      options?: MutationFunctionOptions<TData, TVariables>,
    ) => Promise<FetchResult<TData>>,
  ) => Promise<unknown>;
  operation?: OperationType;
  Component?: React.FunctionComponent<any>;
};
