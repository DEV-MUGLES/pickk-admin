import {Dayjs} from 'dayjs';

import {FormInputProps} from '../form-input.types';

import {QuickButtonValue} from './quick-buttons';

export type DatePickerProps = FormInputProps<{
  lookup: string;
  range: [Dayjs, Dayjs];
}> & {
  lookupOptions?: Array<{name: string; value: string}>;
  /** @default 'oneMonth' */
  defaultQuickButtonValue?: QuickButtonValue;
};
