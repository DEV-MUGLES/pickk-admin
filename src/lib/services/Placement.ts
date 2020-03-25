import base from './Api';
import {PlacementPreview, Placement, Filter} from '@src/types';

const getPreviewList = (): Promise<PlacementPreview> =>
  base(true)
    .get('/partner/placements/preview/')
    .then(res => res.data);

const getList = (filter: Filter): Promise<Placement[]> =>
  base(true)
    .get('/partner/placements/', {
      params: filter,
    })
    .then(res => res.data);

const PlacementService = {
  getPreviewList,
  getList,
};

export default PlacementService;
