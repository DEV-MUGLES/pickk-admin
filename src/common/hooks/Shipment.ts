import {useAxiosQuery} from './Api';
import ShipmentService from '@src/lib/services/Shipment';
import {ShipmentPreview} from '@src/types';

export const useShipmentPreview = useAxiosQuery<ShipmentPreview>(
  ShipmentService.getPreviewList,
);
