import {useState} from 'react';
import styled from 'styled-components';
import {Typography, Button} from 'antd';
import {ReloadOutlined, FileExcelOutlined} from '@ant-design/icons';

import {BoardTableProps} from '../board-table.types';

import BoardDataExportModal from './data-export-modal';

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
} & Pick<BoardTableProps, 'title' | 'excelColumns' | 'useExcelData'>;

export default function BoardTableHeader(props: BoardTableHeaderProps) {
  const {title, totalDataSize, onRefreshClick, useExcelData} = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <StyledWrapper>
      <Title level={5}>
        {title} 목록 (총 {totalDataSize} 개)
      </Title>
      <StyledRow>
        <Button onClick={() => onRefreshClick()} icon={<ReloadOutlined />}>
          새로고침
        </Button>
        {!!useExcelData && (
          <Button
            onClick={() => setIsModalOpen(true)}
            icon={<FileExcelOutlined />}>
            파일로 내보내기
          </Button>
        )}
      </StyledRow>
      {isModalOpen && (
        <BoardDataExportModal
          {...props}
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </StyledWrapper>
  );
}
