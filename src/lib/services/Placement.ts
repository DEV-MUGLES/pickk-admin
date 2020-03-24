import base from './Api';
import {PlacementPreview} from '@src/types/Placement';

const getPreviewList = (): Promise<PlacementPreview> =>
  base(true)
    .get(`/partner/placements/preview/`)
    .then(res => res.data);

const PlacementService = {
  getPreviewList,
};

export default PlacementService;
