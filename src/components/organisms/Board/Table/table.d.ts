export type TableActionType = {
  icon?: string;
  text?: string;
  onClick?: (
    number: number[],
    mutate?: (
      options?: MutationFunctionOptions<TData, TVariables>,
    ) => Promise<FetchResult<TData>>,
  ) => Promise<boolean>;
  hook?: () => MutationTuple;
  Component?: React.FunctionComponent<any>;
};
