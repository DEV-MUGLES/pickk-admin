import React from 'react';
import styled from 'styled-components';
import {Select} from 'antd';

const {Option} = Select;

export type TablePageSizeSelectProps = {
  pageSize: number;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
};

const PAGE_SIZES = [10, 50, 100];

export default function TablePageSizeSelect({
  pageSize,
  setPageSize,
}: TablePageSizeSelectProps) {
  return (
    <StyledSelect value={pageSize} onChange={setPageSize}>
      {PAGE_SIZES.map(size => (
        <Option key={size} value={size}>
          {size}개 씩
        </Option>
      ))}
    </StyledSelect>
  );
}

const StyledSelect = styled(Select)`
  && {
    margin-left: auto;
    width: 100px;
  }
`;
