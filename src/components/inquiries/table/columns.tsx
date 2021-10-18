import {ColumnsType} from 'antd/lib/table';

import {InquiryDataType} from '@src/containers/inquiries/hooks';
import {
  addDashToPhoneNumber,
  getInquiryTypeDisplayName,
  getTimeString,
  renderBoolean,
  stringSorter,
} from '@src/common/helpers';

import InquiriesTableItemCard from './item-card';

export const inquiriesColumns: ColumnsType<InquiryDataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => stringSorter(b.id, a.id),
    width: 60,
    ellipsis: true,
  },
  {
    title: '답변여부',
    dataIndex: 'isAnswered',
    key: 'isAnswered',
    render: renderBoolean,
    width: 60,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '상품정보',
    dataIndex: 'itemInfo',
    key: 'itemInfo',
    render: (_, record) => (
      <InquiriesTableItemCard
        imageUrl={record.item.imageUrl}
        name={record.item.name}
      />
    ),
    width: 160,
  },
  {
    title: '작성자',
    dataIndex: 'userName',
    key: 'userName',
    render: (_, record) => record.user.nickname,
    width: 80,
    ellipsis: true,
  },
  {
    title: '작성자 연락처',
    dataIndex: 'userPhoneNumber',
    key: 'userPhoneNumber',
    render: (_, record) => addDashToPhoneNumber(record.user.phoneNumber),
    width: 80,
    ellipsis: true,
  },
  {
    title: '제목',
    dataIndex: 'title',
    key: 'title',
    width: 140,
  },
  {
    title: '내용',
    dataIndex: 'content',
    key: 'content',
    width: 200,
  },
  {
    title: '문의발생시간',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: (a, b) => stringSorter(b.createdAt, a.createdAt),
    render: (value) => getTimeString(value),
    width: 80,
  },
  {
    title: '주문상품번호',
    dataIndex: 'orderItemMerchantUid',
    key: 'orderItemMerchantUid',
    width: 100,
  },
  {
    title: '문의타입',
    dataIndex: 'type',
    key: 'type',
    render: (value) => getInquiryTypeDisplayName(value) + '문의',
    width: 100,
  },
  {
    title: '비밀글여부',
    dataIndex: 'isSecret',
    key: 'isSecret',
    render: renderBoolean,
    width: 80,
    ellipsis: true,
    align: 'center',
  },
];
