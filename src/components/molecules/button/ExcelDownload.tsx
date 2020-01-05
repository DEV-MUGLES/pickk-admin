import { Button } from "antd";
import ReactExport from "react-export-excel";
import { getDateTimeStrings } from "@src/lib/DateParser";

const { ExcelFile, ExcelSheet, ExcelColumn } = ReactExport;

export type ExcelDownloadButtonProps = {
  title: string;
  columns: {
    title: string;
    key: string;
  }[];
  dataSource: {}[];
};

export default function ExcelDownloadButton({
  title,
  columns,
  dataSource
}: ExcelDownloadButtonProps) {
  const { year, month, day, hours, minutes, seconds } = getDateTimeStrings();
  const fileName = `[핔]${title.replace(" ", "")}_${year.substring(
    2
  )}${month}${day}_${hours}${minutes}${seconds}`;

  const getExcelColumns = columns =>
    columns.map((item, index) => (
      <ExcelColumn key={index} label={item.title} value={item.key} />
    ));

  return (
    <ExcelFile
      filename={fileName}
      element={
        <Button
          icon="file-excel"
          style={{ color: "green", borderColor: "green" }}
        >
          엑셀 다운
        </Button>
      }
    >
      <ExcelSheet data={dataSource} name={title}>
        {getExcelColumns(columns)}
      </ExcelSheet>
    </ExcelFile>
  );
}
