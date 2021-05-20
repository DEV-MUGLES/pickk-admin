import dayjs from 'dayjs';
import {Button, Image} from 'antd';
import {ColumnsType} from 'antd/lib/table';

import {renderBooleanColumn} from '@src/components/molecules/BoardFilter/render';
import {addCommaToNumber} from '@src/lib/NumberParser';
import {stringSorter} from '@src/lib/sorter';

export const itemColumns: ColumnsType<any> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 40,
    sorter: (a, b) => b.id - a.id,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '상세보기',
    dataIndex: 'itemView',
    key: 'itemView',
    width: 40,
    render: (_, {id, urls}) => (
      <div>
        <Button
          size="small"
          href={`https://pickk.one/item/${id}`}
          target="_blank"
          style={{marginBottom: '0.2rem'}}>
          pickk 링크
        </Button>
        <Button
          type="link"
          href={urls.find((url) => url.isPrimary)?.url}
          target="_blank">
          공홈 링크
        </Button>
      </div>
    ),
    align: 'center',
  },
  {
    title: '대표이미지',
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    width: 120,
    render: (text) => <Image src={text} />,
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
    align: 'center',
  },
  {
    title: '할인가',
    dataIndex: 'salePrice',
    key: 'salePrice',
    render: (value) => <div>{addCommaToNumber(value)}원</div>,
    sorter: (a, b) => b.salePrice - a.salePrice,
    width: 80,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '리뷰수',
    dataIndex: 'reviewCount',
    key: 'reviewCount',
    sorter: (a, b) => b.reviewCount - a.reviewCount,
    width: 60,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '구매수',
    dataIndex: 'purchasedCount',
    key: 'purchasedCount',
    sorter: (a, b) => b.purchasedCount - a.purchasedCount,
    width: 60,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '활성화 여부',
    dataIndex: 'isSellable',
    key: 'isSellable',
    width: 60,
    render: renderBooleanColumn,
    align: 'center',
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
