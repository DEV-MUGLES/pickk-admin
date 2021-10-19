import {
  CarOutlined,
  ImportOutlined,
  ShoppingOutlined,
  UnorderedListOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import {ExchangeRequestStatus} from '@pickk/common';

import {PreviewType} from '@components/new-common/organisms/board-preview';

export const exchangeRequestsPreviews: PreviewType[] = [
  {
    label: '교환 요청',
    name: 'Requested',
    Icon: UnorderedListOutlined,
    filter: {status: ExchangeRequestStatus.Requested},
  },
  {
    label: '교환 수거 완료',
    name: 'Picked',
    Icon: ImportOutlined,
    filter: {status: ExchangeRequestStatus.Picked},
  },
  {
    label: '교환 배송 중',
    name: 'Reshipping',
    Icon: CarOutlined,
    filter: {status: ExchangeRequestStatus.Reshipping},
  },
  {
    label: '교환 배송 완료',
    name: 'Reshipped',
    Icon: ShoppingOutlined,
    filter: {status: ExchangeRequestStatus.Reshipped},
  },
  {
    label: '교환 처리 지연',
    name: 'process_delayed',
    Icon: ClockCircleOutlined,
    filter: {
      statusIn: [ExchangeRequestStatus.Picked, ExchangeRequestStatus.Requested],
      isProcessDelaying: true,
    },
  },
];
