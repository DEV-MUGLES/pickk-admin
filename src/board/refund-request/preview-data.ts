import {CheckOutlined, ShoppingOutlined} from '@ant-design/icons';

export const refundRequestPreviewData = [
  {
    label: '반품 요청',
    icon: ShoppingOutlined,
    filterValue: {status: 'REQUESTED'},
  },
  {
    label: '반품 수거 중',
    icon: CheckOutlined,
    filterValue: {status: 'PICKING'},
  },
  {
    label: '반품 수거 완료',
    icon: CheckOutlined,
    filterValue: {status: 'PICKED'},
  },
  {
    label: '반품 완료',
    icon: ShoppingOutlined,
    filterValue: {status: 'CONFIRMED'},
  },
];
