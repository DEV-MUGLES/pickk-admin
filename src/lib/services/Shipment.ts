import base from './Api';
import {ShipmentPreview} from '@src/types';

const getPreviewList = (): Promise<ShipmentPreview> =>
  base(true)
    .get('/partner/shipments/preview/')
    .then(res => res.data);

const ShipmentService = {
  getPreviewList,
};

export default ShipmentService;
