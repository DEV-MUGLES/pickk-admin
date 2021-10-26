import {CommentOutlined} from '@ant-design/icons';

import {PreviewType} from '@components/common/organisms/board-preview';

export const inquiriesPreviews: PreviewType[] = [
  {
    label: '미답변 문의',
    name: 'not_answered',
    Icon: CommentOutlined,
    filter: {isAnswered: false},
  },
];
