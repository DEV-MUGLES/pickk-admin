import {
  ShoppingOutlined,
  CheckOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import {RefundRequestStatus} from '@pickk/common';

import {PreviewDataType} from '../common/organisms/Board/preview';

export const refundRequestPreviewData: PreviewDataType[] = [
  {
    label: '반품 요청',
    name: 'Requested',
    icon: ShoppingOutlined,
    filterValue: {status: RefundRequestStatus.Requested},
  },
  {
    label: '반품 수거완료',
    name: 'Picked',
    icon: CheckOutlined,
    filterValue: {status: RefundRequestStatus.Picked},
  },
  {
    label: '반품 완료',
    name: 'Confirmed',
    icon: CheckOutlined,
    filterValue: {status: RefundRequestStatus.Confirmed},
  },
  {
    label: '반품처리지연',
    name: 'process_delayed',
    icon: ClockCircleOutlined,
    filterValue: {
      statusIn: [RefundRequestStatus.Picked, RefundRequestStatus.Requested],
      isProcessDelaying: true,
    },
  },
];
