import {CheckOutlined, ShoppingOutlined} from '@ant-design/icons';
import {OrderItemStatus} from '@pickk/common';

import {PreviewDataType} from '../common/organisms/Board/preview';

export const placementPreviewData: PreviewDataType[] = [
  {
    label: '신규주문',
    name: 'paid',
    icon: ShoppingOutlined,
    filterValue: {status: OrderItemStatus.Paid},
  },
  {
    label: '발송준비',
    name: 'ship_ready',
    icon: CheckOutlined,
    filterValue: {status: OrderItemStatus.ShipReady},
  },
  {
    label: '신규주문 지연',
    name: 'process_delayed_paid',
    icon: ShoppingOutlined,
    filterValue: {status: OrderItemStatus.Paid, isProcessDelaying: true},
  },
  {
    label: '발송준비 지연',
    name: 'process_delayed_ship_ready',
    icon: CheckOutlined,
    filterValue: {status: OrderItemStatus.ShipReady, isProcessDelaying: true},
  },
];
