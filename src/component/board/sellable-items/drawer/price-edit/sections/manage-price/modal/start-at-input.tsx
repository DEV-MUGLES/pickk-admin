import styled from 'styled-components';
import {Checkbox} from 'antd';
import dayjs, {Dayjs} from 'dayjs';

import DatePickerFormItem from '@src/components/organisms/Form/Items/date-picker';

import {CustomInputProps} from '@src/components/organisms/Form/base';

export type StartAtInputProps = CustomInputProps<Dayjs> & {
  hideCheckbox: boolean;
};

function StartAtInput({value, onChange, hideCheckbox}: StartAtInputProps) {
  const handleDateChange = (date) => {
    onChange?.(date);
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      handleDateChange(dayjs());
    }
  };

  return (
    <Wrapper>
      <DatePickerFormItem
        onChange={handleDateChange}
        value={value}
        style={{marginRight: 'auto'}}
        isStartOfDay
      />
      {!hideCheckbox && (
        <Checkbox onChange={handleCheckboxChange}>
          현재 가격으로 활성화하기
        </Checkbox>
      )}
    </Wrapper>
  );
}

export default StartAtInput;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
`;
