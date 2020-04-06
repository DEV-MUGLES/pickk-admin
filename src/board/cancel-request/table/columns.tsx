import {getTimeString} from '@src/lib/DateParser';
import {addDashToPhoneNumber} from '@src/lib/PhoneNumberParser';
import {stringSorter} from '@src/lib/sorter';

export const cancelRequestColumns = [
  {
    title: '주문번호',
    dataIndex: 'orderMerchantUid',
    key: 'orderMerchantUid',
    sorter: (a, b) => stringSorter(b.orderMerchantUid, a.orderMerchantUid),
    width: 120,
    ellipsis: true,
  },
  {
    title: '주문상태',
    dataIndex: 'orderStatus',
    key: 'orderStatus',
    sorter: (a, b) => stringSorter(b.orderStatus, a.orderStatus),
    width: 110,
    ellipsis: true,
  },
  {
    title: '취소 처리상태',
    dataIndex: 'cancelStatus',
    key: 'cancelStatus',
    sorter: (a, b) => stringSorter(b.cancelStatus, a.cancelStatus),
    width: 110,
    ellipsis: true,
  },
  {
    title: '결제일',
    dataIndex: 'paidAt',
    key: 'paidAt',
    render: value => <div>{getTimeString(value)}</div>,
    sorter: (a, b) => stringSorter(b.paidAt, a.paidAt),
    width: 140,
    ellipsis: true,
  },
  {
    title: '취소요청일',
    dataIndex: 'requestedAt',
    key: 'requestedAt',
    render: value => <div>{getTimeString(value)}</div>,
    sorter: (a, b) => stringSorter(b.requestedAt, a.requestedAt),
    width: 140,
    ellipsis: true,
  },
  {
    title: '취소완료일',
    dataIndex: 'confirmedAt',
    key: 'confirmedAt',
    render: value => <div>{getTimeString(value)}</div>,

    sorter: (a, b) => stringSorter(b.confirmedAt, a.confirmedAt),
    width: 140,
    ellipsis: true,
  },
  {
    title: '취소사유',
    dataIndex: 'reason',
    key: 'reason',
    sorter: (a, b) => stringSorter(b.reason, a.reason),
    width: 200,
    ellipsis: true,
  },
  {
    title: '상품명(전체)',
    dataIndex: 'itemNames',
    key: 'itemNames',
    render: value => value.join('-'),
    sorter: (a, b) =>
      stringSorter(b.itemNames.join('-'), a.itemNames.join('-')),
    width: 200,
    ellipsis: true,
  },
  {
    title: '옵션(전체)',
    dataIndex: 'options',
    key: 'options',
    render: value => value.map(v => v.join('/')).join(','),
    sorter: (a, b) =>
      stringSorter(
        b.options.map(v => v.join('/')).join(','),
        a.options.map(v => v.join('/')).join(','),
      ),
    width: 200,
    ellipsis: true,
  },
  {
    title: '수량',
    dataIndex: 'quantity',
    key: 'quantity',
    sorter: (a, b) => b.quantity - a.quantity,
    width: 75,
    ellipsis: true,
  },
  {
    title: '구매자명',
    dataIndex: 'buyerName',
    key: 'buyerName',
    sorter: (a, b) => stringSorter(b.buyerName, a.buyerName),
    width: 100,
    ellipsis: true,
  },
  {
    title: '구매자 연락처',
    dataIndex: 'buyerPhone',
    key: 'buyerPhone',
    render: value => <div>{value ? addDashToPhoneNumber(value) : null}</div>,
    sorter: (a, b) => stringSorter(b.buyerPhone, a.buyerPhone),
    width: 125,
    ellipsis: true,
  },
  {
    title: '수취인명',
    dataIndex: 'orderAddressName',
    key: 'orderAddressName',
    sorter: (a, b) => stringSorter(b.orderAddressName, a.orderAddressName),
    width: 75,
    ellipsis: true,
  },
  {
    title: '수취인 연락처',
    dataIndex: 'orderAddressPhone',
    key: 'orderAddressPhone',
    render: value => <div>{value ? addDashToPhoneNumber(value) : null}</div>,
    sorter: (a, b) => stringSorter(b.orderAddressPhone, a.orderAddressPhone),
    width: 125,
    ellipsis: true,
  },
];