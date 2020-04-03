import {useAxiosQuery} from './Api';
import RefundRequestService from '@src/lib/services/RefundRequest';
import CancelRequestService from '@src/lib/services/CancelRequest';
import {RefundRequestPreview, CancelRequestPreview} from '@src/types';

export const useRefundRequestPreview = useAxiosQuery<RefundRequestPreview>(
  RefundRequestService.getPreviewList,
);

export const useCancelRequestPreview = useAxiosQuery<CancelRequestPreview>(
  CancelRequestService.getPreviewList,
);
