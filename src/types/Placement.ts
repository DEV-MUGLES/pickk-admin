import {OrderItem} from './OrderItem';

export type PlacementPreview = {
  cancelledBeforeShippingCount: number;
  addressChangedCount: number;
  paidCount: number;
  placedCount: number;
};

export type Placement = OrderItem & {
  itemId: number;
  courier: string;
  trackingCode: string;
  trackingViewUrl: string;
};
