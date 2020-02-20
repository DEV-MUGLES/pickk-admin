import {addCommaToNumber} from '@src/lib/NumberParser';

const columns = [
  {
    title: '카테고리',
    dataIndex: 'itemMinorType',
    key: 'itemMinorType',
    sorter: (a, b) => a.itemMinorType > b.itemMinorType,
    width: 100,
    ellipsis: true,
  },
  {
    title: '상품명',
    dataIndex: 'name',
    key: 'name',
    render: value => <a>{value}</a>,
    sorter: (a, b) => a.name > b.name,
    width: 200,
    ellipsis: true,
  },
  {
    title: '정가',
    dataIndex: 'originalPrice',
    key: 'originalPrice',
    render: value => <div>{addCommaToNumber(value)}원</div>,
    sorter: (a, b) => a.originalPrice > b.originalPrice,
    width: 100,
    ellipsis: true,
  },
  {
    title: '할인가',
    dataIndex: 'salePrice',
    key: 'salePrice',
    render: value => <div>{addCommaToNumber(value)}원</div>,
    sorter: (a, b) => a.salePrice > b.salePrice,
    width: 100,
    ellipsis: true,
  },
  {
    title: '리뷰수',
    dataIndex: 'reviewCount',
    key: 'reviewCount',
    sorter: (a, b) => a.reviewCount - b.reviewCount,
    width: 100,
    ellipsis: true,
  },
  {
    title: '총조회수',
    dataIndex: 'totalViewCount',
    key: 'totalViewCount',
    sorter: (a, b) => a.totalViewCount - b.totalViewCount,
    width: 100,
    ellipsis: true,
  },
  {
    title: '판매수',
    dataIndex: 'salesCount',
    key: 'salesCount',
    sorter: (a, b) => a.salesCount - b.salesCount,
    width: 100,
    ellipsis: true,
  },
  {
    title: '상품번호',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id - b.id,
    width: 100,
    ellipsis: true,
  },
];

export default columns;
