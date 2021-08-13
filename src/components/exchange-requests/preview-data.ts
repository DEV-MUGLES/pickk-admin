import {
  CarOutlined,
  ImportOutlined,
  ShoppingOutlined,
  UnorderedListOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import {ExchangeRequestStatus} from '@pickk/common';

import {PreviewDataType} from '../common/organisms/Board/preview';

export const exchangeRequestPreviewData: PreviewDataType[] = [
  {
    label: '교환 요청',
    name: 'requested',
    icon: UnorderedListOutlined,
    filterValue: {status: ExchangeRequestStatus.Requested},
  },
  {
    label: '교환 수거 완료',
    name: 'picked',
    icon: ImportOutlined,
    filterValue: {status: ExchangeRequestStatus.Picked},
  },
  {
    label: '교환 배송 중',
    name: 'reshipping',
    icon: CarOutlined,
    filterValue: {status: ExchangeRequestStatus.Reshipping},
  },
  {
    label: '교환 배송 완료',
    name: 'reshipped',
    icon: ShoppingOutlined,
    filterValue: {status: ExchangeRequestStatus.Reshipped},
  },
  {
    label: '교환 처리 지연',
    name: 'process_delayed',
    icon: ClockCircleOutlined,
    filterValue: {
      statusIn: [ExchangeRequestStatus.Picked, ExchangeRequestStatus.Requested],
      isProcessDelaying: true,
    },
  },
];
