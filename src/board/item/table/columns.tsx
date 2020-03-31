import {addCommaToNumber} from '@src/lib/NumberParser';
import {stringSorter} from '@src/lib/sorter';

export const itemColumns = [
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
    render: value => <div>{addCommaToNumber(value)}원</div>,
    sorter: (a, b) => b.originalPrice - a.originalPrice,
    width: 70,
    ellipsis: true,
  },
  {
    title: '할인가',
    dataIndex: 'salePrice',
    key: 'salePrice',
    render: value => <div>{addCommaToNumber(value)}원</div>,
    sorter: (a, b) => b.salePrice - a.salePrice,
    width: 70,
    ellipsis: true,
  },
  {
    title: 'SKU일련번호',
    dataIndex: 'skuPrefix',
    key: 'skuPrefix',
    sorter: (a, b) => stringSorter(b.skuPrefix, a.skuPrefix),
    width: 70,
    ellipsis: true,
  },
  {
    title: '구독할인율',
    dataIndex: 'subsDiscountRate',
    key: 'subsDiscountRate',
    sorter: (a, b) => b.subsDiscountRate - a.subsDiscountRate,
    width: 70,
    ellipsis: true,
  },
  /*{
    title: '리뷰 수',
    dataIndex: 'reviewCount',
    key: 'reviewCount',
    sorter: (a, b) => b.reviewCount - a.reviewCount,
    width: 50,
    ellipsis: true,
  },*/
  {
    title: '구매 수',
    dataIndex: 'purchasedCount',
    key: 'purchasedCount',
    sorter: (a, b) => b.purchasedCount - a.purchasedCount,
    width: 50,
    ellipsis: true,
  },
  {
    title: '제품링크',
    dataIndex: 'purchaseUrl',
    key: 'purchaseUrl',
    sorter: (a, b) => stringSorter(a.purchaseUrl, b.purchaseUrl),
    render: value => (
      <a href={value} target="_blank">
        {value}
      </a>
    ),
    width: 50,
    ellipsis: true,
  },
];
