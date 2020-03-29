import {PageHeader, Popover, Button, Typography} from 'antd';
import styled from 'styled-components';
import Colors from '@src/components/atoms/colors';

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
        <Button icon="info-circle" />
      </Popover>
    );
  };

  return (
    <StyledPageHeader
      title={title}
      subTitle={subTitle}
      extra={helpTexts ? getHelpPopoverButton() : null}
    />
  );
}

const StyledPageHeader = styled(PageHeader)`
  height: fit-content;
  background-color: ${Colors.White};
`;

const StyledUl = styled.ul`
  padding: 0;
  padding-left: 16px;
  padding-top: 10px;
`;
