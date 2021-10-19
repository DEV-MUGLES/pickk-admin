import styled from 'styled-components';
import {Typography, Button} from 'antd';
import {ReloadOutlined} from '@ant-design/icons';

import {
  ExcelDownloadButton,
  CSVDownloadButton,
  ExcelDownloadButtonProps,
} from '@src/components/common/molecules/button';

import {BoardTableProps} from './board-table.types';

const {Title} = Typography;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 0 0.8rem;
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > * {
    margin-right: 0.4rem;
  }
`;

export type BoardTableHeaderProps = {
  totalDataSize: number;
  onRefreshClick: () => void;
} & Pick<BoardTableProps, 'title' | 'dataSource' | 'excelColumns'>;

export default function BoardTableHeader({
  title,
  totalDataSize,
  dataSource,
  excelColumns,
  onRefreshClick,
}: BoardTableHeaderProps) {
  const excelDownloadButtonProps: ExcelDownloadButtonProps = {
    title,
    dataSource: [...dataSource],
    columns: excelColumns,
  };

  return (
    <StyledWrapper>
      <Title level={5}>
        {title} 목록 (총 {totalDataSize} 개)
      </Title>
      <StyledRow>
        <Button onClick={() => onRefreshClick()} icon={<ReloadOutlined />}>
          새로고침
        </Button>
        <CSVDownloadButton {...excelDownloadButtonProps} />
        <ExcelDownloadButton {...excelDownloadButtonProps} />
      </StyledRow>
    </StyledWrapper>
  );
}
