import {GetServerSideProps} from 'next';
import {PageHeader} from 'antd';

import InquiryDetailContainer from '@src/containers/inquiry-detail';

export default function InquiryDetailPage({id}: {id: number}) {
  return (
    <>
      <PageHeader title="문의 상세" />
      <InquiryDetailContainer id={id} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const {id} = params;
  const inquiryId = parseInt(id.toString());

  if (isNaN(inquiryId)) {
    throw new Error('유효하지 않은 문의 ID입니다.');
  }

  return {
    props: {id: inquiryId},
  };
};
