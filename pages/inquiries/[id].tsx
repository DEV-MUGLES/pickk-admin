import {useRouter} from 'next/router';

import BoardHeader from '@src/components/common/organisms/Board/Header';
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
      <BoardHeader title="문의 상세" />
      <InquiryDetailContainer id={inquiryId} />
    </>
  );
}
