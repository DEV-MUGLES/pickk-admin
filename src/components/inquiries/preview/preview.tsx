import {Preview} from '@src/components/common/organisms';

import {useInquiriesPreview} from './hooks';

import {inquiriesPreviewData} from './preview-data';

export default function InquiriesPreview() {
  return (
    <Preview data={inquiriesPreviewData} usePreviewData={useInquiriesPreview} />
  );
}
