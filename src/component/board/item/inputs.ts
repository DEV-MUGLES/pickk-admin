import dayjs from 'dayjs';

import InputBox from '@src/components/molecules/BoardFilter/input/InputBox';
import CheckBox from '@src/components/molecules/BoardFilter/input/CheckBox';
import Selector from '@src/components/molecules/BoardFilter/input/Selector';
import Datepicker from '@src/components/molecules/BoardFilter/input/DatePicker';

export const itemInputs = [
  {
    name: 'name',
    labelText: '상품명',
    Component: InputBox,
  },
  {
    name: 'isReviewed',
    labelText: '카테고리',
    select: [{name: '전체', value: null}],
    Component: Selector,
  },
  {
    name: 'period',
    defaultValue: {
      type: 'all',
      startDate: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD'),
    },
    labelText: '조회기간',
    select: [
      {name: '활성등록일', value: ''},
      {name: '상품생성일', value: ''},
    ],
    Component: Datepicker,
  },
];
