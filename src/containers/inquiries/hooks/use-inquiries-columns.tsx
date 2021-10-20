import {useState} from 'react';
import {Button, Space} from 'antd';
import {ColumnsType} from 'antd/lib/table';

import {inquiriesColumns} from '@components/inquiries';

import {useToggleModals} from '@common/hooks';

import {FlattenInquiryDataType} from './use-inquiries';

export const useInquiriesColumns = () => {
  const {isModalOpen, openModal, closeModal} = useToggleModals([
    'inquiryAnswer',
  ]);

  const [selectedRecord, setSelectedRecord] =
    useState<FlattenInquiryDataType>(null);

  const handleAnswerClick = (record: FlattenInquiryDataType) => () => {
    setSelectedRecord(record);
    openModal('inquiryAnswer');
  };

  const newInquiriesColumns: ColumnsType<FlattenInquiryDataType> = [
    inquiriesColumns[0],
    {
      title: '',
      dataIndex: 'answer',
      key: 'answer',
      render: (_, record) => (
        <Space direction="vertical">
          <Button onClick={handleAnswerClick(record)}>답변달기</Button>
          <Button href={`/inquiries/${record.id}`} target="_blank">
            상세보기
          </Button>
        </Space>
      ),
      width: 60,
      ellipsis: true,
    },
    ...inquiriesColumns.slice(1),
  ];
  return {
    inquiriesColumns: newInquiriesColumns,
    selectedRecord,
    isInquiryAnswerModalOpen: isModalOpen.inquiryAnswer,
    closeInquiryAnswerModal: () => closeModal('inquiryAnswer'),
  };
};
