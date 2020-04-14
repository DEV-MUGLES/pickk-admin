import {useAxiosQuery} from './Api';
import SettlementService from '@src/lib/services/Settlement';
import {SettlementPreview} from '@src/types';

export const useSettlementtPreview = useAxiosQuery<SettlementPreview>(
  SettlementService.getPreviewList,
);
