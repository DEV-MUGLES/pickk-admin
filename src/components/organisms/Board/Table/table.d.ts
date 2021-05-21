import {OperationType} from '@src/operations/type';

export type TableActionType = {
  icon?: string;
  text?: string;
  handleClick?: (
    ids: number[],
    mutate?: (options?: MutationFunctionOptions) => Promise<FetchResult>,
  ) => Promise<boolean>;
  operation?: OperationType;
  Component?: React.FunctionComponent<any>;
};
