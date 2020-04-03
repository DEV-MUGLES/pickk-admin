import {useAxiosQuery} from '../Api';
import RefundRequestService from '@src/lib/services/RefundRequest';
import {RefundRequest} from '@src/types';

export const useRefundRequestTable = useAxiosQuery<RefundRequest[]>(
  RefundRequestService.getList,
);
