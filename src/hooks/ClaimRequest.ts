import {useAxiosQuery} from './Api';
import RefundRequestService from '@src/lib/services/RefundRequest';
import CancelRequestService from '@src/lib/services/CancelRequest';
import ExchangeRequestService from '@src/lib/services/ExchangeRequest';
import {
  RefundRequestPreview,
  CancelRequestPreview,
  ExchangeRequestPreview,
} from '@src/types';

export const useRefundRequestPreview = useAxiosQuery<RefundRequestPreview>(
  RefundRequestService.getPreviewList,
);

export const useCancelRequestPreview = useAxiosQuery<CancelRequestPreview>(
  CancelRequestService.getPreviewList,
);

export const useExchangeRequestPreview = useAxiosQuery<ExchangeRequestPreview>(
  ExchangeRequestService.getPreviewList,
);
