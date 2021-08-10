import {ColumnsType} from 'antd/lib/table';
import {Button, Image, Typography, Badge} from 'antd';
import {Item} from '@pickk/common';

import SellableItemStock from './stock';
import InfoTooltip from '@src/components/common/atoms/info-tooltip';
import {renderBooleanColumn} from '@src/components/common/molecules/BoardFilter/render';

import {addCommaToNumber} from '@src/lib/NumberParser';
import {stringSorter} from '@src/lib/sorter';

const {Text} = Typography;

export const sellableItemColumns: ColumnsType<Item> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => b.id - a.id,
    width: 40,
  },
  {
    title: '대표이미지',
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    width: 200,
    render: (text) => <Image src={text} />,
    ellipsis: true,
    align: 'center',
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
    sorter: (a, b) => stringSorter(b.name, a.name),
  },
  {
    title: '정가',
    dataIndex: 'originalPrice',
    key: 'originalPrice',
    width: 120,
    align: 'center',
    render: (value) => <div>{addCommaToNumber(value)}원</div>,
    sorter: (a, b) => b.originalPrice - a.originalPrice,
  },
  {
    title: '공급가',
    dataIndex: 'sellPrice',
    key: 'sellPrice',
    width: 120,
    align: 'center',
    render: (value) => <div>{addCommaToNumber(value)}원</div>,
    sorter: (a, b) => b.sellPrice - a.sellPrice,
  },
  {
    title: '무한재고여부',
    dataIndex: 'isInfiniteStock',
    key: 'isInfiniteStock',
    width: 100,
    align: 'center',
    render: renderBooleanColumn,
  },
  {
    title: ItemStockColumnTitle,
    dataIndex: 'stock',
    key: 'stock',
    width: 100,
    align: 'center',
    render: (_, {products, isInfiniteStock, isSoldout}) => (
      <SellableItemStock
        products={products}
        isInfiniteStock={isInfiniteStock}
        isSoldout={isSoldout}
      />
    ),
    ellipsis: true,
  },
  // @TODO: uncomment when the field is ready
  // {
  //   title: '리뷰수',
  //   dataIndex: 'reviewCount',
  //   key: 'reviewCount',
  //   width: 80,
  //   align: 'center',
  //   sorter: (a, b) => b.reviewCount - a.reviewCount,
  // },
  // {
  //   title: '구매수',
  //   dataIndex: 'purchasedCount',
  //   key: 'purchasedCount',
  //   width: 80,
  //   align: 'center',
  //   sorter: (a, b) => b.purchasedCount - a.purchasedCount,
  // },
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
    align: 'center',
    render: renderBooleanColumn,
  },
  {
    title: '공홈링크',
    dataIndex: 'urls',
    key: 'urls',
    align: 'center',
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

export function ItemStockColumnTitle() {
  return (
    <Text>
      보유재고
      <InfoTooltip
        placement="right"
        title={
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '0.4rem',
            }}>
            <Badge color="lime" text="재고 충분 (무한재고)" />
            <Badge color="yellow" text="재고가 5개 미만인 옵션 존재" />
            <Badge color="orange" text="옵션 1개 이상 품절" />
            <Badge color="volcano" text="재고 전체 품절" />
          </div>
        }
        color="white"
        iconStyle={{marginLeft: '0.2rem'}}
      />
    </Text>
  );
}
