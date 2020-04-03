import {useAxiosQuery} from './Api';
import RefundRequestService from '@src/lib/services/RefundRequest';
import {RefundRequestPreview} from '@src/types';

export const useRefundRequestPreview = useAxiosQuery<RefundRequestPreview>(
  RefundRequestService.getPreviewList,
);
