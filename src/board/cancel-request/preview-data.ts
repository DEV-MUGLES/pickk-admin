import {
  CheckOutlined,
  CloseOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

export const canceldRequestPreviewData = [
  {
    label: '취소 요청',
    icon: UnorderedListOutlined,
    filterValue: {status: 'REQUESTED'},
  },
  {
    label: '취소 완료',
    icon: CheckOutlined,
    filterValue: {status: 'CONFIRMED'},
  },
  {
    label: '취소 실패',
    icon: CloseOutlined,
    filterValue: {status: 'CONFIRMED'},
    disabled: true,
  },
  {
    label: '취소 거부',
    icon: CloseOutlined,
    filterValue: {status: 'REJECTED'},
  },
];
