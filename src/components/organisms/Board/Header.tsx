import { PageHeader, Popover, Button, Typography } from "antd";
import styled from "styled-components";

export type BoardHeaderProps = {
  title: string;
  subTitle: string;
  helpTexts: string[];
};

export default function BoardHeader({
  title,
  subTitle,
  helpTexts
}: BoardHeaderProps) {
  const getHelpPopoverButton = (helpTexts: string[]) => {
    const content = (
      <StyledUl>
        {helpTexts.map((item, index) => (
          <li key={index}>
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
    <PageHeader
      title={title}
      subTitle={subTitle}
      extra={[getHelpPopoverButton(helpTexts)]}
    />
  );
}

const StyledUl = styled.ul`
  padding: 0;
  padding-left: 16px;
  padding-top: 10px;
`;
