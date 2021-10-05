import React from 'react';
import {Button, Modal, message} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import CSVReader from 'react-csv-reader';
import {OrderItemStatus} from '@pickk/common';

import {getOrderItemStatusDisplayName} from '@src/common/helpers';

import {useBulkShipMeSellerOrderItems, useGetCourierId} from './hooks';

const {confirm} = Modal;

export type BulkCSVShipProps = {
  reload: () => void;
};

export default function BulkCSVShip({reload}: BulkCSVShipProps) {
  const {bulkShipMeSellerOrderItems} = useBulkShipMeSellerOrderItems();
  const {getCourierId} = useGetCourierId();

  const paparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  };

  const getShipValidData = (
    data: unknown[],
  ): {merchantUid: string; courierId: number; trackCode: string}[] => {
    return data
      .filter(
        (record) =>
          record['주문상태'] ===
          getOrderItemStatusDisplayName(OrderItemStatus.ShipReady),
      )
      .map((record) => {
        return {
          merchantUid: record['주문상품번호']?.toString(),
          courierId: getCourierId(record['택배사']?.toString()),
          trackCode: record['송장번호']?.toString(),
        };
      })
      .filter((record) => Object.values(record).every((value) => !!value));
  };

  return (
    <>
      <div style={{display: 'none'}}>
        <CSVReader
          cssClass="csv-reader-input"
          label="Select CSV with secret Death Star statistics"
          onFileLoaded={(dataCsv) => {
            const result = getShipValidData(dataCsv);
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
                    `비정상적인 CSV 파일입니다. (주문번호가 변조됐을 수 있습니다.) - ${err}`,
                  );
                }
              },
              onCancel() {
                message.warning('CSV일괄발송이 취소되었습니다.');
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
          const element: HTMLElement = document.getElementById(
            'react-csv-reader-input',
          ) as HTMLElement;
          element.click();
        }}>
        CSV일괄발송
      </Button>
    </>
  );
}
