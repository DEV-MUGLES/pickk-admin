import {BoardModelType, actionsType, columnsType, inputsType} from '..';
import columns from './columns';
import inputs from './inputs';

export class BoardModel implements BoardModelType {
  static getPathByName = (name: string) => {
    if (name === 'products') {
      return '/items';
    }
  };

  actions: actionsType;
  columns: columnsType;
  inputs: inputsType;
  name: string;
  path: string;

  constructor(name) {
    this.name = name;
    this.path = BoardModel.getPathByName(name);
  }
}

export default class ProductsBoardModel extends BoardModel {
  constructor() {
    super('products');
    this.columns = columns;
    this.inputs = inputs;
  }
}
