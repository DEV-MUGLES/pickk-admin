import {PreviewDataResult} from '@components/common/organisms/board-preview';
import {useOrderItemsPreveiwData} from '@containers/order-items/hooks';
import {shipmentPreviews} from '@components/shipments';

import {shipmentsBaseFilter} from './use-shipments';

export const useShipmentsPreviewData = (): PreviewDataResult => {
  return useOrderItemsPreveiwData(shipmentPreviews, shipmentsBaseFilter);
};
