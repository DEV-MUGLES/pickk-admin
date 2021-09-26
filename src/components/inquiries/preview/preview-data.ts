import {CommentOutlined, ClockCircleOutlined} from '@ant-design/icons';

import {PreviewDataType} from '@src/components/common/organisms/Board/preview';

// eslint-disable-next-line @pickk/array-naming-convention
export const inquiriesPreviewData: PreviewDataType[] = [
  {
    label: '미답변 문의',
    name: 'not_answered',
    icon: CommentOutlined,
    filterValue: {isAnswered: false},
  },
  // @TODO : delayed 필터 적용
  // {
  //   label: '장기 미답변 문의',
  //   name: 'delayed',
  //   icon: ClockCircleOutlined,
  //   filterValue: {isAnswered: false},
  // },
];
