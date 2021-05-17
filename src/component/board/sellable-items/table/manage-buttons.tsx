import {Button, Space} from 'antd';
import styled from 'styled-components';

export type SellableItemManageButtonsProps = {
  id: string;
};

function SellableItemManageButtons({id}: SellableItemManageButtonsProps) {
  return (
    <Wrapper>
      <StyledButton>가격 관리</StyledButton>
      <StyledButton>옵션/재고 관리</StyledButton>
      <StyledButton>정보 수정</StyledButton>
    </Wrapper>
  );
}
export default SellableItemManageButtons;

const Wrapper = styled(Space).attrs({
  direction: 'vertical',
})`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)``;
