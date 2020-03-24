import base from './Api';
import {PlacementPreview} from '@src/types';

const getPreviewList = (): Promise<PlacementPreview> =>
  base(true)
    .get('/partner/placements/preview/')
    .then(res => res.data)
    .catch(err => console.log(err.response));

const PlacementService = {
  getPreviewList,
};

export default PlacementService;
