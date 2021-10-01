import React from 'react';
import styled from 'styled-components';
import {Typography} from 'antd';

import TableReloadButton from '@src/components/common/molecules/button/TableReload';
import {
  ExcelDownloadButton,
  ExcelDownloadButtonProps,
  CSVDownloadButton,
} from '@src/components/common/molecules/button';
import {isEqualObject} from '@src/common/helpers';

const {Text} = Typography;

export type TableHeaderProps = Pick<
  ExcelDownloadButtonProps,
  'title' | 'dataSource' | 'columns'
>;

function TableHeader(props: TableHeaderProps) {
  return (
    <StyledWrapper>
      <Text strong>
        {`${props.title} 목록 (총 ${
          props.dataSource ? props.dataSource.length : '...'
        }개)`}
      </Text>
      <StyledRow>
        <TableReloadButton />
        <CSVDownloadButton {...props} />
        <ExcelDownloadButton {...props} />
      </StyledRow>
    </StyledWrapper>
  );
}

export default React.memo(TableHeader, (prev, next) =>
  isEqualObject(prev.dataSource, next.dataSource),
);

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > *:not(:last-child) {
    margin-right: 0.6rem;
  }
`;
