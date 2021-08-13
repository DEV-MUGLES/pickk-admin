import React from 'react';
import styled from 'styled-components';
import {AntdIconProps} from '@ant-design/icons/lib/components/AntdIcon';
import {Typography} from 'antd';
import {ReloadOutlined} from '@ant-design/icons';

import PreviewButton from '@src/components/common/molecules/button/preview';
import {WHITE} from '@src/common/constants/colors';

import {Filter} from '@src/common/contexts/Board/types';
import {getTimeString} from '@src/common/helpers';

const {Text} = Typography;

export type PreviewDataType = {
  label: string;
  name?: string; // @TODO : 모두 새로운 프리뷰 적용 후 not optional로 변경
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
          <div>
            <LastUpdateAtText>
              {getTimeString(previewData['lastUpdatedAt'])}
            </LastUpdateAtText>
            <StyledReloadOutlined onClick={reload} />
          </div>
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

  background-color: ${WHITE};
  margin-bottom: 1.4rem;
`;

const PreviewHeader = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem 24px 0.4rem 24px;
  justify-content: space-between;
`;

const TitleText = styled(Text).attrs({
  strong: true,
})``;

const LastUpdateAtText = styled(Text).attrs({type: 'secondary'})`
  margin-right: 0.8rem;
`;

const StyledReloadOutlined = styled(ReloadOutlined)`
  width: 1rem;
  height: 1rem;
  color: gray;

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
