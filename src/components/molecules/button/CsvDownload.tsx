import {Button} from 'antd';
import {CSVLink} from 'react-csv';

import {getDateTimeStrings} from '@src/lib/DateParser';
import {useBoardContext} from '@src/contexts/Board';
import {ExcelDownloadButtonProps} from './ExcelDownload';

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

  const headers = columns.map(item => {
    return {
      key: item.key,
      label: item.title,
    };
  });

  return (
    <>
      <CSVLink
        id="csv-download"
        data={dataSource ? parseExcelData(dataSource) : []}
        filename={fileName}
        headers={headers}></CSVLink>
      <Button
        icon="file-excel"
        style={{color: 'green', borderColor: 'green'}}
        onClick={() => {
          let element: HTMLElement = document.getElementById(
            'csv-download',
          ) as HTMLElement;
          element.click();
        }}>
        CSV 다운
      </Button>
    </>
  );
}
