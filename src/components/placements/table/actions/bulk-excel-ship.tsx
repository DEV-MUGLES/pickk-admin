import React from 'react';
import {Upload, Button, Modal, message} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import * as XLSX from 'xlsx';
import {OrderItemStatus} from '@pickk/common';

import {getOrderItemStatusDisplayName} from '@src/common/helpers';

import {useBulkShipMeSellerOrderItems, useGetCourierId} from './hooks';

const {confirm} = Modal;

export type BulkExcelShipProps = {
  reload: () => void;
};

export default function BulkExcelShip({reload}: BulkExcelShipProps) {
  const {bulkShipMeSellerOrderItems} = useBulkShipMeSellerOrderItems();
  const {getCourierId} = useGetCourierId();

  const getShipValidData = (
    data: unknown[],
    getCourierId: (name: string) => number,
  ): {merchantUid: string; courierId: number; trackCode: string}[] => {
    return data
      .filter(
        (record) =>
          // record[2] : 주문상태
          record[2] ===
          getOrderItemStatusDisplayName(OrderItemStatus.ShipReady),
      )
      .map((record) => {
        // record[0], record[4], record[5] : 주문상품번호, 택배사, 송장번호
        return {
          merchantUid: record[0].toString(),
          courierId: getCourierId(record[4].toString()),
          trackCode: record[5].toString(),
        };
      })
      .filter((record) => Object.values(record).every((value) => !!value));
  };

  return (
    <Upload
      showUploadList={false}
      beforeUpload={(file) => {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (e) => {
          const data = e.target.result;
          const readedData = XLSX.read(data, {type: 'binary'});
          const wsname = readedData.SheetNames[0];
          const ws = readedData.Sheets[wsname];

          /* Convert array to json*/
          const dataParse = XLSX.utils.sheet_to_json(ws, {header: 1});
          const slicedData = dataParse.slice(1); // 헤더를 제외한 데이터
          const result = getShipValidData(slicedData, getCourierId);

          confirm({
            title: '발송처리할 주문 개수를 확인해주세요.',
            icon: <ExclamationCircleOutlined />,
            content: (
              <div>
                <p>
                  배송준비중 : <b>{result.length} 개</b>
                  {`('배송준비중' 상태인 주문만 발송처리 할 수 있습니다.)`}
                </p>
                <p>
                  ** 택배사와 송장번호가 비어있는 주문상품은 발송처리되지
                  않습니다.
                </p>
              </div>
            ),
            onOk: async () => {
              try {
                await bulkShipMeSellerOrderItems(result);

                message.success('적용되었습니다.');
                reload();
              } catch (err) {
                message.error(
                  `비정상적인 엑셀 파일입니다. (주문번호가 변조됐을 수 있습니다.) - ${err}`,
                );
              }
            },
            onCancel() {
              message.warning('엑셀일괄발송이 취소되었습니다.');
            },
          });
        };
        return false;
      }}>
      <Button>엑셀일괄발송</Button>
    </Upload>
  );
}
