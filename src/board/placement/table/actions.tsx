import {Upload, Button, Modal, Icon, message} from 'antd';
import * as XLSX from 'xlsx';

import {TableActionType} from '@src/components/organisms/Board/Table/table';
import {useBoardContext} from '@src/contexts/Board';
import OrderItemService from '@src/lib/services/OrderItem';

const {confirm} = Modal;

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
    Component: () => {
      const {tableData} = useBoardContext().state;

      return (
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

              const count = {};
              dataParse.slice(1).forEach(record => {
                const status = record[4];
                count[status] =
                  count[status] !== undefined ? count[status] + 1 : 1;
              });

              confirm({
                title: '입력한 주문 개수를 확인해주세요.',
                icon: <Icon type="ExclamationCircleOutlined" />,
                content: (
                  <div>
                    {Object.keys(count).map(status => (
                      <p key={status}>{`${status} : ${count[status]}개`}</p>
                    ))}
                  </div>
                ),
                onOk() {
                  try {
                    const result = dataParse.slice(1).map(record => {
                      return {
                        merchantUid: record[1] !== undefined ? record[1] : '',
                        courier: record[17] !== undefined ? record[17] : '',
                        trackingCode:
                          record[18] !== undefined ? record[18] : '',
                      };
                    });
                    OrderItemService.ship(result);
                  } catch {
                    message.error(
                      '비정상적인 엑셀 파일입니다. (주문번호가 변조됐을 수 있습니다.)',
                    );
                  }
                },
                onCancel() {
                  message.warning('엑셀일괄발송이 취소되었습니다.');
                },
              });
            };
            reader.readAsBinaryString(file);
            return false;
          }}>
          <Button>엑셀일괄발송</Button>
        </Upload>
      );
    },
  },
  /*{
    text: '구독 할인 설정',
    onClick: (nums: number[]) => {
      return;
    },
  },*/
];
