import {BoardFilter} from '@src/components/common/organisms';

import {inquiryFilterInputs} from './inputs';

type InquiriesFilterProps = {
  title: string;
};

export default function InquiriesFilter(props: InquiriesFilterProps) {
  return <BoardFilter {...props} inputs={inquiryFilterInputs} />;
}
