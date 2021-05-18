import {Button, Image} from 'antd';
import dayjs from 'dayjs';

import {renderBooleanColumn} from '@src/components/molecules/BoardFilter/render';
import {addCommaToNumber} from '@src/lib/NumberParser';
import {stringSorter} from '@src/lib/sorter';

export const itemColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 40,
    sorter: (a, b) => b.id - a.id,
    ellipsis: true,
  },
  {
    title: '상세보기',
    dataIndex: 'itemManage',
    key: 'itemManage',
    width: 100,
    render: (_, {id}) => <Button size="small">상세보기</Button>,
    ellipsis: true,
  },
  {
    title: '대표이미지',
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    width: 120,
    render: (text) => (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <Image src={text} />
        <Button size="small">수정</Button>
      </div>
    ),
    ellipsis: true,
  },
  {
    title: '카테고리',
    dataIndex: 'category',
    key: 'category',
    width: 100,
    render: (_, {majorCategory, minorCategory}) => (
      <>
        <p>{`${majorCategory?.name ?? '-'}/${minorCategory?.name ?? '-'}`}</p>
        <Button size="small">수정</Button>
      </>
    ),
    ellipsis: true,
  },
  {
    title: '상품명',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => stringSorter(b.name, a.name),
    width: 200,
  },
  {
    title: '정가',
    dataIndex: 'originalPrice',
    key: 'originalPrice',
    render: (value) => <div>{addCommaToNumber(value)}원</div>,
    sorter: (a, b) => b.originalPrice - a.originalPrice,
    width: 80,
    ellipsis: true,
  },
  {
    title: '할인가',
    dataIndex: 'salePrice',
    key: 'salePrice',
    render: (value) => <div>{addCommaToNumber(value)}원</div>,
    sorter: (a, b) => b.salePrice - a.salePrice,
    width: 80,
    ellipsis: true,
  },
  {
    title: '리뷰수',
    dataIndex: 'reviewCount',
    key: 'reviewCount',
    sorter: (a, b) => b.reviewCount - a.reviewCount,
    width: 60,
    ellipsis: true,
  },
  {
    title: '구매수',
    dataIndex: 'purchasedCount',
    key: 'purchasedCount',
    sorter: (a, b) => b.purchasedCount - a.purchasedCount,
    width: 60,
    ellipsis: true,
  },
  {
    title: '활성화 여부',
    dataIndex: 'isSellable',
    key: 'isSellable',
    width: 60,
    render: renderBooleanColumn,
  },
  {
    title: '공홈링크',
    dataIndex: 'urls',
    key: 'urls',
    width: 60,
    render: (_, {urls}) => (
      <Button type="link" href={urls.find((url) => url.isPrimary)?.url}>
        상품보기
      </Button>
    ),
    ellipsis: true,
  },
  {
    title: '상품등록일',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 80,
    sorter: (a, b) => stringSorter(b.createdAt, a.createdAt),
    render: (text) => <>{dayjs(text).format('YYYY-MM-DD')}</>,
    ellipsis: true,
  },
];
