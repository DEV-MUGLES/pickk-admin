import {
  CheckOutlined,
  ShoppingOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import {OrderItemStatus, OrderItemFilter} from '@pickk/common';

import {PreviewType} from '@components/common/organisms/board-preview';

export const placementPreviews: PreviewType<OrderItemFilter>[] = [
  {
    label: '신규주문',
    name: 'Paid',
    Icon: ShoppingOutlined,
    filter: {status: OrderItemStatus.Paid, isProcessDelaying: null},
  },
  {
    label: '발송준비',
    name: 'ShipReady',
    Icon: CheckOutlined,
    filter: {status: OrderItemStatus.ShipReady, isProcessDelaying: null},
  },
  {
    label: '신규주문 지연',
    name: 'process_delayed_Paid',
    Icon: ClockCircleOutlined,
    filter: {status: OrderItemStatus.Paid, isProcessDelaying: true},
  },
  {
    label: '발송준비 지연',
    name: 'process_delayed_ShipReady',
    Icon: ClockCircleOutlined,
    filter: {status: OrderItemStatus.ShipReady, isProcessDelaying: true},
  },
];
