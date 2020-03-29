export type TableActionType = {
  icon?: string;
  text?: string;
  onClick?: (number) => Promise<boolean>;
  Component?: React.FunctionComponent<any>;
};
