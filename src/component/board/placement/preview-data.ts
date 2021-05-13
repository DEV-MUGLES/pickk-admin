import {CheckOutlined, ShoppingOutlined} from '@ant-design/icons';

export const placementPreviewData = [
  {
    label: '발송 전 취소 요청',
    icon: ShoppingOutlined,
    filterValue: {sumin: 1},
    disabled: true,
  },
  {
    label: '발송 전 배송지 변경',
    icon: CheckOutlined,
    filterValue: {sumin: 2},
    disabled: true,
  },
  {label: '신규 주문', icon: ShoppingOutlined, filterValue: {status: 'PAID'}},
  {
    label: '발주 확인 완료',
    icon: CheckOutlined,
    filterValue: {status: 'PLACED'},
  },
];
