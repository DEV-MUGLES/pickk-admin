import ExcelDownloadButton, {ExcelDownloadButtonProps} from './ExcelDownload';

export type CsvDownloadButton = ExcelDownloadButtonProps;

export default function CsvDownloadButton(props: CsvDownloadButton) {
  return (
    <ExcelDownloadButton
      {...props}
      options={{extension: 'csv'}}
      buttonText="CSV 다운"
    />
  );
}
