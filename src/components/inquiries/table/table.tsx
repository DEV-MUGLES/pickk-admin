import {useState} from 'react';
import {Button, Space} from 'antd';
import {ColumnsType} from 'antd/lib/table';

import {BoardTable} from '@src/components/common/organisms';

import {InquiryDataType} from '@src/containers/inquiries/hooks';
import {useBoardContext} from '@src/common/contexts/Board';

import {InquiryAnswerModal} from './modal';

import {inquiriesColumns} from './columns';

export type InquiriesTableProps = {
  title: string;
};

export default function InquiriesTable({title}: InquiriesTableProps) {
  const {
    state: {tableData},
  } = useBoardContext();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(-1);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleAnswerClick = (id: number) => () => {
    setSelectedId(id);
    setIsModalVisible(true);
  };

  const newInquiriesColumns: ColumnsType<InquiryDataType> = [
    inquiriesColumns[0],
    {
      title: '',
      dataIndex: 'answer',
      key: 'answer',
      render: (_, {id}) => (
        <Space direction="vertical">
          <Button onClick={handleAnswerClick(id)}>답변달기</Button>
          <Button href={`/inquiries/${id}`} target="_blank">
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
      <InquiryAnswerModal
        visible={isModalVisible}
        onClose={handleModalClose}
        inquiryId={selectedId}
        answerCount={
          tableData?.find((record) => record.id === selectedId)?.answers?.length
        }
      />
    </>
  );
}
