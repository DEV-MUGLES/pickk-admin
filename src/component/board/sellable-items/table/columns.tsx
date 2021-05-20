import {ColumnsType} from 'antd/lib/table';

import {Button, Image} from 'antd';
import SellableItemStock from './stock';
import {renderBooleanColumn} from '@src/components/molecules/BoardFilter/render';

export const sellableItemColumns: ColumnsType = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 40,
  },
  {
    title: '대표이미지',
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    width: 200,
    render: (text) => <Image src={text} />,
  },
  {
    title: '카테고리',
    dataIndex: 'category',
    key: 'category',
    width: 100,
    render: (_, {majorCategory, minorCategory}) => (
      <p>{`${majorCategory?.name ?? '-'}/${minorCategory?.name ?? '-'}`}</p>
    ),
  },
  {
    title: '상품명',
    dataIndex: 'name',
    key: 'name',
    width: 200,
  },
  {
    title: '정가',
    dataIndex: 'originalPrice',
    key: 'originalPrice',
    width: 120,
  },
  {
    title: '공급가',
    dataIndex: 'finalPrice',
    key: 'finalPrice',
    width: 120,
  },
  {
    title: '무한재고여부',
    dataIndex: 'isInfiniteStock',
    key: 'isInfiniteStock',
    width: 100,
    render: renderBooleanColumn,
  },
  {
    title: '보유재고 (?)',
    dataIndex: 'stock',
    key: 'stock',
    width: 100,
    render: (_, {products, isInfiniteStock, isSoldout}) => (
      <SellableItemStock
        products={products}
        isInfiniteStock={isInfiniteStock}
        isSoldout={isSoldout}
      />
    ),
  },
  {
    title: '리뷰수',
    dataIndex: 'reviewCount',
    key: 'reviewCount',
    width: 80,
  },
  {
    title: '구매수',
    dataIndex: 'purchasedCount',
    key: 'purchasedCount',
    width: 80,
  },
  {
    title: '안내메세지',
    dataIndex: 'notice',
    key: 'notice',
    width: 120,
    render: (_, {notice}) => <>{notice?.message}</>,
  },
  {
    title: 'MD 추천 여부',
    dataIndex: 'isMdRecommended',
    key: 'isMdRecommended',
    width: 120,
    render: renderBooleanColumn,
  },
  {
    title: '공홈링크',
    dataIndex: 'urls',
    key: 'urls',
    render: (_, {urls}) => (
      <Button type="link" href={urls.find((url) => url.isPrimary)?.url}>
        상품보기
      </Button>
    ),
  },
  {
    // TODO
    title: '활성전환일',
    dataIndex: '',
    key: '',
    width: 120,
  },
];
