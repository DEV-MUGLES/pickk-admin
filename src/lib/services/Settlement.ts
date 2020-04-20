import base from './Api';
import {
  Settlement,
  Filter,
  SettlementCountPreview,
  SettlementAmountPreview,
} from '@src/types';

const getCountPreviewList = (): Promise<SettlementCountPreview> =>
  base(true)
    .get('/partner/settlements/preview/count/')
    .then((res) => {
      console.log(res.data);
      return res.data;
    });

const getAmountPreviewList = (): Promise<SettlementAmountPreview> =>
  base(true)
    .get('/partner/settlements/preview/amount/')
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
  getCountPreviewList,
  getAmountPreviewList,
  getList,
};

export default SettlementService;
