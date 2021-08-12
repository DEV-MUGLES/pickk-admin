import {
  CarOutlined,
  ImportOutlined,
  LoadingOutlined,
  ShoppingOutlined,
  StopOutlined,
  UnorderedListOutlined,
  CloseOutlined,
} from '@ant-design/icons';

export const exchangeRequestPreviewData = [
  {
    label: '교환 요청',
    icon: UnorderedListOutlined,
    filterValue: {status: 'REQUESTED'},
  },
  {
    label: '교환 수거 중',
    icon: LoadingOutlined,
    filterValue: {status: 'PICKING'},
  },
  {
    label: '교환 수거 완료',
    icon: ImportOutlined,
    filterValue: {status: 'PICKED'},
  },
  {
    label: '교환 배송 중',
    icon: CarOutlined,
    filterValue: {status: 'RESHIPPING'},
  },
  {
    label: '교환 배송 완료',
    icon: ShoppingOutlined,
    filterValue: {status: 'REDELIVERED'},
  },
  {
    label: '교환 취소',
    icon: StopOutlined,
    filterValue: {status: 'CANCELLED'},
    disabled: true,
  },
  {
    label: '교환 거부',
    icon: CloseOutlined,
    filterValue: {status: 'REJECTED'},
    disabled: true,
  },
];
