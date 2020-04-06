import base from './Api';
import {Settlement} from '@src/types';

const getList = (): Promise<Settlement> =>
  base(true)
    .get('/partner/settlements/')
    .then((res) => res.data);

const SettlementService = {
  getList,
};

export default SettlementService;
