import moment from 'moment';
import InputBox from '@src/components/molecules/BoardFilter/input/InputBox';
import MultiChecker from '@src/components/molecules/BoardFilter/input/MultiChecker';
import ItemCategorySelector from '@src/components/molecules/BoardFilter/input/ItemCategorySelector';
import Datepicker from '@src/components/molecules/BoardFilter/input/DatePicker';

const inputs = [
  {
    name: 'productName',
    defaultValue: {
      query: '',
    },
    labelText: '상품명',
    Component: InputBox,
  },
  {
    name: 'sellingState',
    defaultValue: {
      choices: [
        '판매대기',
        '판매중',
        '품절',
        '승인대기',
        '판매중지',
        '판매종료',
        '판매금지',
      ],
    },
    labelText: '판매상태',
    options: [
      {name: '판매대기', value: 'waitSelling'},
      {name: '판매중', value: 'nowSelling'},
      {name: '품절', value: 'soldOut'},
      {name: '승인대기', value: 'waitConfirm'},
      {name: '판매중지', value: 'stopSelling'},
      {name: '판매종료', value: 'endSelling'},
      {name: '판매금지', value: 'banSelling'},
    ],
    Component: MultiChecker,
  },
  {
    name: 'category',
    defaultValue: {
      major: 'all',
      minor: 'all',
      final: 'all',
    },
    labelText: '카테고리',
    Component: ItemCategorySelector,
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

export default inputs;
