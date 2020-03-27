export type TableActionType = {
  icon?: string;
  text?: string;
  onClick?: (number) => void;
  Component?: React.FunctionComponent<any>;
};
