import {Button} from 'antd';
import {CSVLink} from 'react-csv';
import {FileExcelOutlined} from '@ant-design/icons';

import {getDateTimeStrings} from '@src/common/helpers/date';
import {useBoardContext} from '@src/common/contexts/Board';

export type ExcelDownloadButtonProps = {
  title: string;
  columns: Array<{
    title: string;
    key: string;
  }>;
  dataSource: Array<{}>;
};

export default function CsvDownloadButton({
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

  const headers = columns.map((item) => {
    return {
      key: item.key,
      label: item.title,
    };
  });

  return (
    <>
      <CSVLink
        id="csv-download"
        data={dataSource ? (parseExcelData(dataSource) as any) : []}
        filename={fileName}
        headers={headers}></CSVLink>
      <Button
        icon={<FileExcelOutlined />}
        style={{color: 'green', borderColor: 'green'}}
        onClick={() => {
          const element: HTMLElement = document.getElementById(
            'csv-download',
          ) as HTMLElement;
          element.click();
        }}>
        CSV 다운
      </Button>
    </>
  );
}
