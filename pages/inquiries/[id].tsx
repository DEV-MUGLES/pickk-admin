import {useRouter} from 'next/router';
import {PageHeader} from 'antd';

import InquiryDetailContainer from '@src/containers/inquiry-detail';

export default function InquiryDetailPage() {
  const router = useRouter();
  const inquiryId = parseInt(router?.query?.id.toString());

  if (isNaN(inquiryId)) {
    alert('잘못된 id입니다.');
    return null;
  }

  return (
    <>
      <PageHeader title="문의 상세" />
      <InquiryDetailContainer id={inquiryId} />
    </>
  );
}
