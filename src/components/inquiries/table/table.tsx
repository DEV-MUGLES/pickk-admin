import {useState} from 'react';
import {Button, Space} from 'antd';
import {ColumnsType} from 'antd/lib/table';

import {BoardTable} from '@src/components/common/organisms';

import {InquiryDataType} from '@src/containers/inquiries/hooks';

import {InquiryAnswerModal} from './modal';

import {inquiriesColumns} from './columns';

export type InquiriesTableProps = {
  title: string;
};

export default function InquiriesTable({title}: InquiriesTableProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<InquiryDataType>(null);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleAnswerClick = (record: InquiryDataType) => () => {
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const newInquiriesColumns: ColumnsType<InquiryDataType> = [
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

  return (
    <>
      <BoardTable title={title} columns={newInquiriesColumns} />
      {!!selectedRecord && (
        <InquiryAnswerModal
          visible={isModalVisible}
          onClose={handleModalClose}
          inquiryId={selectedRecord.id}
          answers={selectedRecord.answers}
        />
      )}
    </>
  );
}
