import React from 'react';
import styled from 'styled-components';
import {AntdIconProps} from '@ant-design/icons/lib/components/AntdIcon';
import {Typography} from 'antd';
import {ReloadOutlined} from '@ant-design/icons';
import {palette} from '@pickk/design-token';

import PreviewButton from '@src/components/common/molecules/button/preview';

import {Filter} from '@src/common/contexts/Board/types';
import {getTimeString} from '@src/common/helpers';

const {Text} = Typography;

export type PreviewDataType = {
  label: string;
  name: string;
  icon: React.FunctionComponent<AntdIconProps>;
  filterValue: Filter;
  disabled?: boolean;
};

export type PreviewDataResult = {
  data: {lastUpdatedAt?: Date} & Record<string, number>;
  reload: () => void;
};

export type PreviewProps = {
  data: PreviewDataType[];
  usePreviewData: () => PreviewDataResult;
};

function Preview({data, usePreviewData}: PreviewProps) {
  const {data: previewData, reload = () => null} = usePreviewData();

  if (previewData) {
    return (
      <Wrapper>
        <PreviewHeader>
          <TitleText>미니 대시보드</TitleText>
          <LastUpdateAtText>
            마지막 업데이트: {getTimeString(previewData['lastUpdatedAt'])}
          </LastUpdateAtText>
          <StyledReloadOutlined onClick={reload} />
        </PreviewHeader>
        <PreviewBody>
          {data
            .filter((value) => !value.disabled)
            .map((value) => (
              <PreviewButton
                key={value.label}
                {...value}
                count={previewData[value.name]}
              />
            ))}
        </PreviewBody>
      </Wrapper>
    );
  }
  return <></>;
}

export default React.memo(Preview);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  background-color: ${palette.white};
  margin-bottom: 1.4rem;
`;

const PreviewHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 1rem 24px 0.4rem 24px;
`;

const TitleText = styled(Text).attrs({
  strong: true,
})`
  margin-right: auto;
`;

const LastUpdateAtText = styled(Text).attrs({type: 'secondary'})`
  margin-right: 0.6rem;
`;

const StyledReloadOutlined = styled(ReloadOutlined)`
  color: ${palette.gray4};

  &:hover {
    cursor: pointer;
  }
`;

const PreviewBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  padding: 1.4rem 4rem;
`;
