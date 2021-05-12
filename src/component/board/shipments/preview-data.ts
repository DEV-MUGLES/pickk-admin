import {CarOutlined, CheckOutlined} from '@ant-design/icons';

export const shipmentPreviewData = [
  {
    label: '배송 중',
    icon: CarOutlined,
    filterValue: {status: 'SHIPPING'},
  },
  {
    label: '배송 완료',
    icon: CheckOutlined,
    filterValue: {status: 'DELIVERED'},
  },
];
