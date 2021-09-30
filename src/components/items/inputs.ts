import dayjs from 'dayjs';

import InputBox from '@src/components/common/molecules/BoardFilter/input/InputBox';
import ItemCategoryInput from '@src/components/common/molecules/BoardFilter/input/ItemCategoryInput';
import Datepicker from '@src/components/common/molecules/BoardFilter/input/DatePicker';

import {BoardFilterRowProps} from '@src/components/common/molecules/BoardFilter/BodyRow';

export const itemInputs: BoardFilterRowProps[] = [
  {
    name: 'search',
    labelText: '상품명',
    Component: InputBox,
  },
  {
    name: 'category',
    labelText: '카테고리',
    select: [{name: '전체', value: null}],
    Component: ItemCategoryInput,
  },
  {
    name: 'period',
    labelText: '조회기간',
    select: [
      {name: '상품생성일', value: 'createdAtBetween'},
      {name: '활성등록일', value: 'sellableAtBetween'},
    ],
    defaultQuickButtonValue: 'oneMonth',
    Component: Datepicker,
  },
];
