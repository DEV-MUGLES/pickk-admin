import dayjs from 'dayjs';

import InputBox from '@src/components/common/molecules/BoardFilter/input/InputBox';
import ItemCategoryInput from '@src/components/common/molecules/BoardFilter/input/ItemCategoryInput';
import Datepicker from '@src/components/common/molecules/BoardFilter/input/DatePicker';

import {BoardFilterRowProps} from '@src/components/common/molecules/BoardFilter/BodyRow';

export const sellableItemInputs: BoardFilterRowProps[] = [
  {
    name: 'search',
    labelText: '상품명',
    Component: InputBox,
  },
  {
    name: 'category',
    labelText: '카테고리',
    Component: ItemCategoryInput,
  },
  {
    name: 'period',
    labelText: '조회기간',
    select: [
      {name: '활성등록일', value: ''},
      {name: '상품생성일', value: ''},
    ],
    defaultQuickButtonValue: 'oneMonth',
    Component: Datepicker,
  },
];
