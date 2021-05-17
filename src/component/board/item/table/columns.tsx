import {Button, Image} from 'antd';
import {addCommaToNumber} from '@src/lib/NumberParser';
import {stringSorter} from '@src/lib/sorter';

export const itemColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 40,
  },
  {
    title: '상세보기',
    dataIndex: 'itemManage',
    key: 'itemManage',
    width: 100,
    render: (_, {id}) => <Button size="small">상세보기</Button>,
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
      <>
        <p>{`${majorCategory?.name ?? '-'}/${minorCategory?.name ?? '-'}`}</p>
        <Button size="small">수정</Button>
      </>
    ),
  },
  {
    title: '상품명',
    dataIndex: 'name',
    key: 'name',
    sorter: (a, b) => stringSorter(b.name, a.name),
    width: 150,
    ellipsis: true,
  },
  {
    title: '정가',
    dataIndex: 'originalPrice',
    key: 'originalPrice',
    render: (value) => <div>{addCommaToNumber(value)}원</div>,
    sorter: (a, b) => b.originalPrice - a.originalPrice,
    width: 70,
    ellipsis: true,
  },
  {
    title: '할인가',
    dataIndex: 'salePrice',
    key: 'salePrice',
    render: (value) => <div>{addCommaToNumber(value)}원</div>,
    sorter: (a, b) => b.salePrice - a.salePrice,
    width: 70,
    ellipsis: true,
  },
  {
    title: '리뷰 수',
    dataIndex: 'reviewCount',
    key: 'reviewCount',
    sorter: (a, b) => b.reviewCount - a.reviewCount,
    width: 50,
    ellipsis: true,
  },
  {
    title: '구매 수',
    dataIndex: 'purchasedCount',
    key: 'purchasedCount',
    sorter: (a, b) => b.purchasedCount - a.purchasedCount,
    width: 50,
    ellipsis: true,
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
];
