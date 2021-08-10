import {useAxiosQuery} from '../Api';
import SettlementService from '@src/lib/services/Settlement';
import {Settlement} from '@src/types';

export const useSettlementTable = useAxiosQuery<Settlement[]>(
  SettlementService.getList,
);
