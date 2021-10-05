import {
  CheckOutlined,
  ShoppingOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import {OrderItemStatus} from '@pickk/common';

import {PreviewDataType} from '../common/organisms/Board/preview';

export const placementPreviewData: PreviewDataType[] = [
  {
    label: '신규주문',
    name: 'Paid',
    icon: ShoppingOutlined,
    filterValue: {status: OrderItemStatus.Paid, isProcessDelaying: null},
  },
  {
    label: '발송준비',
    name: 'ShipReady',
    icon: CheckOutlined,
    filterValue: {status: OrderItemStatus.ShipReady, isProcessDelaying: null},
  },
  {
    label: '신규주문 지연',
    name: 'process_delayed_Paid',
    icon: ClockCircleOutlined,
    filterValue: {status: OrderItemStatus.Paid, isProcessDelaying: true},
  },
  {
    label: '발송준비 지연',
    name: 'process_delayed_ShipReady',
    icon: ClockCircleOutlined,
    filterValue: {status: OrderItemStatus.ShipReady, isProcessDelaying: true},
  },
];
