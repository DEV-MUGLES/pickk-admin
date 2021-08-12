import {CheckOutlined, ShoppingOutlined} from '@ant-design/icons';
import {RefundRequestStatus} from '@pickk/common';

import {PreviewDataType} from '../common/organisms/Board/preview';

export const refundRequestPreviewData: PreviewDataType[] = [
  {
    label: '반품 요청',
    name: 'requested',
    icon: ShoppingOutlined,
    filterValue: {status: RefundRequestStatus.Requested},
  },
  {
    label: '반품 수거완료',
    name: 'picked',
    icon: CheckOutlined,
    filterValue: {status: RefundRequestStatus.Picked},
  },
  {
    label: '반품 완료',
    name: 'confirmed',
    icon: ShoppingOutlined,
    filterValue: {status: RefundRequestStatus.Confirmed},
  },
];
