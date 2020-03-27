import moment from 'moment';
import Selector from '@src/components/molecules/BoardFilter/input/Selector';
import Datepicker from '@src/components/molecules/BoardFilter/input/DatePicker';
import SelectInput from '@src/components/molecules/BoardFilter/input/SelectInput';

export const itemInputs = [
  {
    name: 'detail',
    labelText: '상세조건',
    select: [
      {name: '수취인명', value: 'addressName'},
      {name: '구매자명', value: 'buyerName'},
      {name: '구매자연락처', value: 'buyerPhone'},
      {name: '구매자이메일', value: 'buyerEmail'},
      {name: '주문번호', value: 'orderMerchantUid'},
      {name: '상품주문번호', value: 'orderItemMerchantUid'},
      {name: '상품번호', value: 'productSku'},
      {name: '송장번호', value: 'trackingCode'},
    ],
    Component: SelectInput,
  },
  {
    name: 'status',
    labelText: '주문상태',
    select: [
      {name: '전체', value: null},
      {name: '발주대기', value: 'PAID'},
      {name: '발송대기', value: 'PLACED'},
      {name: '배송중', value: 'SHIPPING'},
      {name: '배송완료', value: 'DELIVERED'},
    ],
    Component: Selector,
  },
  {
    name: 'period',
    defaultValue: {
      type: 'all',
      startDate: moment()
        .subtract(1, 'months')
        .format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
    },
    labelText: '조회기간',
    select: [
      {name: '전체', value: 'all'},
      {name: '상품등록일', value: 'registerProductDate'},
      {name: '판매시작일', value: 'startSellingDate'},
      {name: '판매종료일', value: 'endSellingDate'},
    ],
    Component: Datepicker,
  },
];
