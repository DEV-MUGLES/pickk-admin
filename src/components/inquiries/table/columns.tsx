import {ColumnsType} from 'antd/lib/table';

import {FlattenInquiryDataType} from '@src/containers/inquiries/hooks';
import {
  addDashToPhoneNumber,
  getInquiryTypeDisplayName,
  renderBoolean,
  renderDateWithTime,
} from '@src/common/helpers';

import InquiriesTableItemCard from './item-card';

export const inquiriesColumns: ColumnsType<FlattenInquiryDataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
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
    render: (_, {itemImageUrl, itemName}) => (
      <InquiriesTableItemCard imageUrl={itemImageUrl} name={itemName} />
    ),
    width: 160,
  },
  {
    title: '작성자',
    dataIndex: 'userNickname',
    key: 'userNickname',
    width: 80,
    ellipsis: true,
  },
  {
    title: '작성자 연락처',
    dataIndex: 'userPhoneNumber',
    key: 'userPhoneNumber',
    render: (value) => addDashToPhoneNumber(value),
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
    render: renderDateWithTime,
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
