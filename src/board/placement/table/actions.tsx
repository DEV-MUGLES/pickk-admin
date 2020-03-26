import {Upload, Button} from 'antd';
import * as XLSX from 'xlsx';

import {TableActionType} from '@src/components/organisms/Board/Table/table';

export const placementActions: TableActionType[] = [
  {
    text: '발주확인',
    onClick: async (ids: number[]) => {
      console.log(ids);
    },
  },
  {
    text: '발송처리',
    onClick: async (ids: number[]) => {
      console.log(ids);
    },
  },
  {
    Component: (
      <Upload
        showUploadList={false}
        beforeUpload={file => {
          const reader = new FileReader();
          reader.onload = e => {
            const data = e.target.result;
            const readedData = XLSX.read(data, {type: 'binary'});
            const wsname = readedData.SheetNames[0];
            const ws = readedData.Sheets[wsname];

            /* Convert array to json*/
            const dataParse = XLSX.utils.sheet_to_json(ws, {header: 1});

            const result = dataParse.slice(1).map(record => {
              return {courier: record[17], trackerCode: record[18]};
            });
            console.log(result);
          };
          reader.readAsBinaryString(file);
          return false;
        }}>
        <Button>엑셀일괄발송</Button>
      </Upload>
    ),
  },
  /*{
    text: '구독 할인 설정',
    onClick: (nums: number[]) => {
      return;
    },
  },*/
];
