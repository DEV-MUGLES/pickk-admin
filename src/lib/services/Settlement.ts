import base from './Api';
import {Settlement, Filter} from '@src/types';

const getList = (filter: Filter): Promise<Settlement> =>
  base(true)
    .get('/partner/settlements/', {
      params: filter,
    })
    .then((res) => res.data);

const SettlementService = {
  getList,
};

export default SettlementService;
