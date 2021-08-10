import {PageHeader, Popover, Typography} from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons';
import styled from 'styled-components';

export type BoardHeaderProps = {
  title: string;
  subTitle?: string;
  helpTexts?: string[];
};

export default function BoardHeader({
  title,
  subTitle,
  helpTexts,
}: BoardHeaderProps) {
  const getHelpPopoverButton = () => {
    const content = (
      <StyledUl>
        {helpTexts.map((item, index) => (
          <li key={'info_' + index}>
            <Typography.Paragraph>{item}</Typography.Paragraph>
          </li>
        ))}
      </StyledUl>
    );
    return (
      <Popover placement="bottomLeft" content={content} trigger="click">
        <InfoCircleOutlined />
      </Popover>
    );
  };

  return (
    <PageHeader
      ghost={false}
      title={title}
      subTitle={subTitle}
      extra={helpTexts ? getHelpPopoverButton() : null}
      style={{marginBottom: '1.4rem'}}
    />
  );
}

const StyledUl = styled.ul`
  padding: 10px 0 0 16px;
`;
