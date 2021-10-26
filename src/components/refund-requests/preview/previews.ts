import {
  CheckOutlined,
  ShoppingOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import {RefundRequestStatus, RefundRequestFilter} from '@pickk/common';

import {PreviewType} from '@components/common/organisms/board-preview';

export const refundRequestsPreviews: PreviewType<RefundRequestFilter>[] = [
  {
    label: '반품 요청',
    name: 'Requested',
    Icon: ShoppingOutlined,
    filter: {status: RefundRequestStatus.Requested},
  },
  {
    label: '반품 수거완료',
    name: 'Picked',
    Icon: CheckOutlined,
    filter: {status: RefundRequestStatus.Picked},
  },
  {
    label: '반품 완료',
    name: 'Confirmed',
    Icon: CheckOutlined,
    filter: {status: RefundRequestStatus.Confirmed},
  },
  {
    label: '반품처리지연',
    name: 'process_delayed',
    Icon: ClockCircleOutlined,
    filter: {
      statusIn: [RefundRequestStatus.Picked, RefundRequestStatus.Requested],
      isProcessDelaying: true,
    },
  },
];
