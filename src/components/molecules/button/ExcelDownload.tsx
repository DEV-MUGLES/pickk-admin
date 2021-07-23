import {Button} from 'antd';
import {FileExcelOutlined} from '@ant-design/icons';
import {
  ExcelDownloadButton as _ExcelDownloadButton,
  ExcelDownloadButtonProps as _ExcelDownloadButtonProps,
} from '@pickk/react-excel';

import {useBoardContext} from '@src/contexts/Board';

export type ExcelDownloadButtonProps = {
  title: string;
  dataSource: unknown[];
  buttonText?: string;
} & Pick<_ExcelDownloadButtonProps, 'options'>;

export default function ExcelDownloadButton({
  title,
  dataSource = [],
  options,
  buttonText = '엑셀 다운',
}: ExcelDownloadButtonProps) {
  const {action} = useBoardContext();
  const excelData = action.parseExcelData(dataSource);
  const fileName = `[핔]${title.replace(' ', '')}`;

  return (
    <_ExcelDownloadButton
      fileName={fileName}
      data={excelData}
      options={{...options, isNameHasDateTime: true}}
      element={
        <Button
          icon={<FileExcelOutlined />}
          style={{color: 'green', borderColor: 'green'}}>
          {buttonText}
        </Button>
      }
    />
  );
}
