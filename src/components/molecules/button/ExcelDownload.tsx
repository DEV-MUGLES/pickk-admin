import {Button} from 'antd';
import ReactExport from 'react-export-excel';
import {getDateTimeStrings} from '@src/lib/DateParser';
import {useBoardContext} from '@src/contexts/Board';

const {ExcelFile} = ReactExport;
const {ExcelSheet, ExcelColumn} = ExcelFile;

export type ExcelDownloadButtonProps = {
  title: string;
  columns: Array<{
    title: string;
    key: string;
  }>;
  dataSource: Array<{}>;
};

export default function ExcelDownloadButton({
  title,
  columns,
  dataSource,
}: ExcelDownloadButtonProps) {
  const {parseExcelData} = useBoardContext().action;

  const {year, month, day, hours, minutes, seconds} = getDateTimeStrings(
    new Date().getTime(),
  );
  const fileName = `[핔]${title.replace(' ', '')}_${year.substring(
    2,
  )}${month}${day}_${hours}${minutes}${seconds}`;

  const getExcelColumns = () =>
    columns.map((item, index) => (
      <ExcelColumn key={index} label={item.title} value={item.key} />
    ));

  return (
    <ExcelFile
      filename={fileName}
      element={
        <Button
          icon="file-excel"
          style={{color: 'green', borderColor: 'green'}}>
          엑셀 다운
        </Button>
      }>
      <ExcelSheet name={title} data={parseExcelData(dataSource)}>
        {getExcelColumns()}
      </ExcelSheet>
    </ExcelFile>
  );
}
