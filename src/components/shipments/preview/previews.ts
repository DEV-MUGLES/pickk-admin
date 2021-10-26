import {CarOutlined, CheckOutlined, SmileOutlined} from '@ant-design/icons';
import {OrderItemStatus, OrderItemFilter} from '@pickk/common';

import {PreviewType} from '@components/common/organisms/board-preview';

export const shipmentPreviews: PreviewType<OrderItemFilter>[] = [
  {
    label: '배송중',
    name: 'Shipping',
    Icon: CarOutlined,
    filter: {status: OrderItemStatus.Shipping, isConfirmed: false},
  },
  {
    label: '배송완료',
    name: 'Shipped',
    Icon: CheckOutlined,
    filter: {status: OrderItemStatus.Shipped, isConfirmed: false},
  },
  {
    label: '구매확정',
    name: 'confirmed',
    Icon: SmileOutlined,
    filter: {isConfirmed: true},
  },
];
