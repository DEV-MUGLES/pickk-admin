import base from './Api';
import {Settlement, Filter, SettlementPreview} from '@src/types';

const getPreviewList = (): Promise<SettlementPreview> =>
  base(true)
    .get('/partner/settlements/preview/')
    .then((res) => {
      console.log(res.data);
      return res.data;
    });

const getList = (filter: Filter): Promise<Settlement> =>
  base(true)
    .get('/partner/settlements/', {
      params: filter,
    })
    .then((res) => res.data);

const SettlementService = {
  getPreviewList,
  getList,
};

export default SettlementService;
