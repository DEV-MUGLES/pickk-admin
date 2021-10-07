import {MutationTuple} from '@apollo/client';

export type TableActionType = {
  icon?: string;
  text?: string;
  onClick?: (ids: number[] | string[]) => Promise<{reloading?: boolean} | void>;
  Component?: React.FunctionComponent<unknown>;
};
