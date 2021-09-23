import {CarOutlined, CheckOutlined, SmileOutlined} from '@ant-design/icons';
import {OrderItemStatus} from '@pickk/common';

export const shipmentPreviewData = [
  {
    label: '배송중',
    name: 'Shipping',
    icon: CarOutlined,
    filterValue: {status: OrderItemStatus.Shipping},
  },
  {
    label: '배송완료',
    name: 'Shipped',
    icon: CheckOutlined,
    filterValue: {status: OrderItemStatus.Shipped},
  },
  {
    label: '구매확정',
    name: 'confirmed',
    icon: SmileOutlined,
    filterValue: {isConfirmed: true},
  },
];
