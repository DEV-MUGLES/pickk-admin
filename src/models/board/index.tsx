import {BoardFilterProps} from '@src/components/organisms/Board/Filter';
import ProductsBoardModel from './products';
import {useAxios} from '@src/lib/services/Api';

export type actionsType = Array<{
  icon?: string;
  text: string;
  // tslint:disable-next-line: no-any
  onClick: (numList: number[]) => void;
}>;

export type columnsType = Array<{
  title: string;
  dataIndex: string;
  key: string;
  // tslint:disable-next-line: no-any
  render?: (value: string | number) => JSX.Element;
  // tslint:disable-next-line: no-any
  sorter: (a: any, b: any) => any;
  width: number;
  ellipsis: boolean;
}>;

export type inputsType = BoardFilterProps['inputs'];

// tslint:disable-next-line: interface-name
export interface BoardModelType {
  actions: actionsType;
  columns: columnsType;
  inputs: inputsType;
}

export class BoardModel implements BoardModelType {
  actions: actionsType;
  columns: columnsType;
  inputs: inputsType;

  useBoardModelData = (path, variables) =>
    useAxios('GET', `/${path}`, {variables});
}

export const getBoardModelByName = (name: string) => {
  let boardModel;
  if (name === 'products') {
    boardModel = new ProductsBoardModel();
  }
  return boardModel;
};
