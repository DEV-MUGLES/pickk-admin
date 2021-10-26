import {PreviewDataResult} from '@components/common/organisms/board-preview';
import {useOrderItemsPreveiwData} from '@containers/order-items/hooks';
import {placementPreviews} from '@components/placements';

import {placementsBaseFilter} from './use-placements';

export const usePlacementsPreviewData = (): PreviewDataResult => {
  return useOrderItemsPreveiwData(placementPreviews, placementsBaseFilter);
};
