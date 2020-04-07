import {Upload, Button, Modal, Icon, message} from 'antd';
import styled from 'styled-components';
import * as XLSX from 'xlsx';
import CSVReader from 'react-csv-reader';

import {TableActionType} from '@src/components/organisms/Board/Table/table';
import OrderItemService from '@src/lib/services/OrderItem';
import PlacementService from '@src/lib/services/Placement';

const {confirm} = Modal;

export const placementActions: TableActionType[] = [
  {
    Component: () => (
      <Upload
        showUploadList={false}
        beforeUpload={(file) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const data = e.target.result;
            const readedData = XLSX.read(data, {type: 'binary'});
            const wsname = readedData.SheetNames[0];
            const ws = readedData.Sheets[wsname];

            /* Convert array to json*/
            const dataParse = XLSX.utils.sheet_to_json(ws, {header: 1});

            const count = {};
            dataParse.slice(1).forEach((record) => {
              const status = record[3];
              count[status] =
                count[status] !== undefined ? count[status] + 1 : 1;
            });

            confirm({
              title: '입력한 주문 개수를 확인해주세요.',
              icon: <Icon type="ExclamationCircleOutlined" />,
              content: (
                <div>
                  {Object.keys(count).map((status) => (
                    <p key={status}>{`${status} : ${count[status]}개`}</p>
                  ))}
                </div>
              ),
              onOk() {
                try {
                  const result = dataParse.slice(1).map((record) => {
                    return {
                      merchantUid: record[1] !== undefined ? record[1] : '',
                      courier: record[20] !== undefined ? record[20] : '',
                      trackingCode: record[21] !== undefined ? record[21] : '',
                    };
                  });
                  console.log(result);
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
    ),
  },
  {
    Component: () => {
      const paparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
      };

      return (
        <>
          <div style={{display: 'none'}}>
            <CSVReader
              cssClass="csv-reader-input"
              label="Select CSV with secret Death Star statistics"
              onFileLoaded={(dataCsv) => {
                const count = {};
                dataCsv.forEach((record) => {
                  const status = record['주문상태'];
                  count[status] =
                    count[status] !== undefined ? count[status] + 1 : 1;
                });
                confirm({
                  title: '입력한 주문 개수를 확인해주세요.',
                  icon: <Icon type="ExclamationCircleOutlined" />,
                  content: (
                    <div>
                      {Object.keys(count).map((status) => (
                        <p key={status}>{`${status} : ${count[status]}개`}</p>
                      ))}
                    </div>
                  ),
                  onOk() {
                    try {
                      const result = dataCsv.map((record) => {
                        return {
                          merchantUid: record['상품주문번호']
                            ? record['상품주문번호'].toString()
                            : '',
                          courier:
                            record['택배사'] !== undefined
                              ? record['택배사']
                              : '',
                          trackingCode: record['송장번호']
                            ? record['송장번호'].toString()
                            : '',
                        };
                      });
                      console.log(result);
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
              }}
              onError={() => message.error('비정상적인 CSV 파일입니다.')}
              parserOptions={paparseOptions}
              inputStyle={{color: 'red'}}
            />
          </div>
          <Button
            onClick={() => {
              let element: HTMLElement = document.getElementById(
                'react-csv-reader-input',
              ) as HTMLElement;
              element.click();
            }}>
            CSV일괄발송
          </Button>
        </>
      );
    },
  },
  {
    text: '주문 취소',
    onClick: async (nums: number[]) => {
      if (nums.length !== 1) {
        message.warning(
          '주문 일괄 취소는 지원하지 않습니다.\n1개의 주문건만 선택해주세요.',
        );
        return Promise.resolve(false);
      }
      try {
        await PlacementService.cancel(nums[0]);
        return Promise.resolve(true);
      } catch {
        return Promise.resolve(false);
      }
    },
  },
];

const Input = styled.input``;
