import {AntdIconProps} from '@ant-design/icons/lib/components/AntdIcon';

export type PreviewType<FilterType = Record<string, unknown>> = {
  label: string;
  name: string;
  Icon: React.FunctionComponent<AntdIconProps>;
  filter: FilterType;
};

export type PreviewDataResult = {
  data: {lastUpdatedAt?: Date} & Record<string, number>;
  reload: () => void;
};

export type BoardPreviewProps<FilterType = Record<string, unknown>> = {
  previews: PreviewType<FilterType>[];
  usePreviewData: () => PreviewDataResult;
  filter: FilterType;
  onPreviewClick: (filter: FilterType) => void;
};
