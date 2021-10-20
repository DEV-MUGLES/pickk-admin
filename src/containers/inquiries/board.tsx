import {useRef} from 'react';

import {BoardTemplate} from '@components/new-common/template';
import {
  inquiriesExcelColumns,
  inquiriesFilterInputs,
  inquiriesPreviews,
  InquiryAnswerModal,
} from '@components/inquiries';

import {BoardTemplateHandle} from '@components/new-common/template/board';

import {
  useInquiries,
  useInquiriesColumns,
  useInquiriesPreviewData,
} from './hooks';

export default function InquiriesBoardContainer() {
  const boardRef = useRef<BoardTemplateHandle>();

  const {
    inquiriesColumns,
    selectedRecord,
    isInquiryAnswerModalOpen,
    closeInquiryAnswerModal,
  } = useInquiriesColumns();

  return (
    <>
      <BoardTemplate
        ref={boardRef}
        title="문의 조회"
        subTitle="사용자들의 문의 내역을 조회하실 수 있는 메뉴입니다."
        useBoardData={useInquiries}
        columns={inquiriesColumns}
        excelColumns={inquiriesExcelColumns}
        filterInputs={inquiriesFilterInputs}
        previews={inquiriesPreviews}
        usePreviewData={useInquiriesPreviewData}
      />
      {!!selectedRecord && (
        <InquiryAnswerModal
          visible={isInquiryAnswerModalOpen}
          onClose={closeInquiryAnswerModal}
          inquiryId={selectedRecord.id}
          answers={selectedRecord.answers}
          reload={boardRef?.current?.reload}
        />
      )}
    </>
  );
}
