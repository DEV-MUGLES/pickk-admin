import {DocumentNode} from 'graphql';

export type TableActionType = {
  icon?: string;
  text?: string;
  handleClick?: (
    ids: number[],
    mutate?: (options?: MutationFunctionOptions) => Promise<FetchResult>,
  ) => Promise<boolean>;
  operation?: DocumentNode;
  Component?: React.FunctionComponent<any>;
};
