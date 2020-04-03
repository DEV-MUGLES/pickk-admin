import {useAxiosQuery} from '../Api';
import RefundRequestService from '@src/lib/services/RefundRequest';
import CancelRequestService from '@src/lib/services/CancelRequest';
import {RefundRequest, CancelRequest} from '@src/types';

export const useRefundRequestTable = useAxiosQuery<RefundRequest[]>(
  RefundRequestService.getList,
);

export const useCancelRequestTable = useAxiosQuery<CancelRequest[]>(
  CancelRequestService.getList,
);
