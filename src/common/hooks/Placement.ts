import {useAxiosQuery} from './Api';
import PlacementService from '@src/lib/services/Placement';
import {PlacementPreview} from '@src/types';

export const usePlacementPreview = useAxiosQuery<PlacementPreview>(
  PlacementService.getPreviewList,
);
