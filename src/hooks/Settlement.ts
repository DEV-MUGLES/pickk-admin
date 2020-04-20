import {useAxiosQuery} from './Api';
import SettlementService from '@src/lib/services/Settlement';
import {SettlementAmountPreview, SettlementCountPreview} from '@src/types';

export const useSettlementCountPreview = useAxiosQuery<SettlementCountPreview>(
  SettlementService.getCountPreviewList,
);

export const useSettlementAmountPreview = useAxiosQuery<
  SettlementAmountPreview
>(SettlementService.getAmountPreviewList);
