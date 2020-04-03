import base from './Api';
// import {message} from 'antd';

import {Filter, CancelRequestPreview, CancelRequest} from '@src/types';

const getPreviewList = (): Promise<CancelRequestPreview> =>
  base(true)
    .get('/partner/cancel_requests/preview/')
    .then(res => res.data);

const getList = (filter: Filter): Promise<CancelRequest[]> =>
  base(true)
    .get('/partner/cancel_requests/', {
      params: filter,
    })
    .then(res => res.data);

const CancelRequestService = {
  getPreviewList,
  getList,
};

export default CancelRequestService;
