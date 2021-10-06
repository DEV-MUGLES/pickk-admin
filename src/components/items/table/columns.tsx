import dayjs from 'dayjs';
import {Button, Image} from 'antd';
import {ColumnsType} from 'antd/lib/table';
import {Item} from '@pickk/common';

import {renderBooleanColumn} from '@src/common/helpers/ColumnRenderer';
import {addCommaToNumber} from '@src/common/helpers/NumberParser';
import {stringSorter} from '@src/common/helpers/sorter';

export const itemColumns: ColumnsType<Item> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 40,
    sorter: (a, b) => b.id - a.id,
    align: 'center',
  },
  {
    title: '상세보기',
    dataIndex: 'itemView',
    key: 'itemView',
    width: 40,
    render: (_, {id, urls}) => (
      <div style={{display: 'flex', flexDirection: 'column'}}>
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
  },
  {
    title: '상품명',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => stringSorter(b.name, a.name),
  },
  {
    title: '정가',
    dataIndex: 'originalPrice',
    key: 'originalPrice',
    render: (value) => addCommaToNumber(value) + ' 원',
    sorter: (a, b) => b.originalPrice - a.originalPrice,
    ellipsis: true,
    align: 'center',
  },
  {
    title: '판매가',
    dataIndex: 'sellPrice',
    key: 'sellPrice',
    render: (value) => addCommaToNumber(value) + ' 원',
    sorter: (a, b) => b.sellPrice - a.sellPrice,
    ellipsis: true,
    align: 'center',
  },
  // @TODO: uncomment when we the field is ready
  // {
  //   title: '리뷰수',
  //   dataIndex: 'reviewCount',
  //   key: 'reviewCount',
  //   sorter: (a, b) => b.reviewCount - a.reviewCount,
  //   width: 60,
  //   ellipsis: true,
  //   align: 'center',
  // },
  // {
  //   title: '구매수',
  //   dataIndex: 'purchasedCount',
  //   key: 'purchasedCount',
  //   sorter: (a, b) => b.purchasedCount - a.purchasedCount,
  //   width: 60,
  //   ellipsis: true,
  //   align: 'center',
  // },
  {
    title: '활성화 여부',
    dataIndex: 'isSellable',
    key: 'isSellable',
    render: renderBooleanColumn,
    align: 'center',
  },
  {
    title: '상품등록일',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: (a, b) => stringSorter(b.createdAt, a.createdAt),
    render: (text) => <>{dayjs(text).format('YYYY-MM-DD')}</>,
    ellipsis: true,
  },
];
