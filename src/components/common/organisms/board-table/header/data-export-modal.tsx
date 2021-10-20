import {Modal, Space, Spin} from 'antd';

import {
  ExcelDownloadButton,
  CSVDownloadButton,
  ExcelDownloadButtonProps,
} from '@components/common/molecules';

import {BoardTableHeaderProps} from './header';

export default function BoardDataExportModal({
  title,
  excelColumns,
  visible,
  onClose,
  useExcelData,
}: Pick<BoardTableHeaderProps, 'title' | 'excelColumns' | 'useExcelData'> & {
  visible: boolean;
  onClose: () => void;
}) {
  const {data = [], loading} = useExcelData();

  const excelDownloadButtonProps: ExcelDownloadButtonProps = {
    title,
    dataSource: [...data],
    columns: excelColumns,
  };

  return (
    <Modal
      title="파일 형식을 선택해주세요"
      width="24rem"
      bodyStyle={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: '2rem',
      }}
      footer={null}
      visible={visible}
      onCancel={onClose}>
      <Spin tip="모든 데이터 불러오는 중..." spinning={loading}>
        <Space>
          <CSVDownloadButton {...excelDownloadButtonProps} />
          <ExcelDownloadButton {...excelDownloadButtonProps} />
        </Space>
      </Spin>
    </Modal>
  );
}
