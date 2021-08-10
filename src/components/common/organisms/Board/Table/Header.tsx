import React from 'react';
import styled from 'styled-components';
import {Typography} from 'antd';

import TableReloadButton from '@src/components/common/molecules/button/TableReload';
import CsvDownloadButton, {
  ExcelDownloadButtonProps,
} from '@src/components/common/molecules/button/CsvDownload';
// import ExcelDownloadButton, {
//   ExcelDownloadButtonProps,
// } from '@src/components/common/molecules/button/ExcelDownload';
import Space from '@src/components/common/atoms/space';
import {isEqualObject} from '@src/lib/utils';

const {Text} = Typography;

export type TableHeaderProps = ExcelDownloadButtonProps;

function TableHeader(props: TableHeaderProps) {
  return (
    <Wrapper>
      <Text strong style={{marginRight: 'auto'}}>
        {`${props.title} 목록 (총 ${
          props.dataSource ? props.dataSource.length : '...'
        }개)`}
      </Text>
      <TableReloadButton />
      <Space direction="ROW" />
      {/* <ExcelDownloadButton {...props} /> */}
      <Space direction="ROW" size={4} />
      <CsvDownloadButton {...props} />
    </Wrapper>
  );
}

export default React.memo(TableHeader, (prev, next) =>
  isEqualObject(prev.dataSource, next.dataSource),
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
