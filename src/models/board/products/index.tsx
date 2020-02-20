import {useAxios} from '@src/lib/services/Api';
import {BoardModelType, actionsType, columnsType, inputsType} from '..';
import columns from './columns';
import inputs from './inputs';

export class BoardModel implements BoardModelType {
  actions: actionsType;
  columns: columnsType;
  inputs: inputsType;

  useBoardModelData = (path, variables) =>
    useAxios('GET', `/${path}`, {variables});
}

export default class ProductsBoardModel extends BoardModel {
  constructor() {
    super();
    this.columns = columns;
    this.inputs = inputs;
  }
}
