import moment from 'moment';

import InputBox from '@src/components/molecules/BoardFilter/input/InputBox';
import Datepicker from '@src/components/molecules/BoardFilter/input/DatePicker';

export const itemInputs = [
  {
    name: 'name',
    defaultValue: {
      query: '',
    },
    labelText: '상품명',
    Component: InputBox,
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
