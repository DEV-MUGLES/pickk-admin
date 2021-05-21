import {Button, Space} from 'antd';
import styled from 'styled-components';

export type SellableItemManageButtonsProps = {
  buttons: {
    label: string;
    onClick: () => void;
  }[];
};

function SellableItemManageButtons({buttons}: SellableItemManageButtonsProps) {
  return (
    <Wrapper>
      {buttons.map(({label, onClick}, index) => (
        <Button
          size="small"
          onClick={onClick}
          style={{marginBottom: index !== buttons.length ? '0.4rem' : 0}}>
          {label}
        </Button>
      ))}
    </Wrapper>
  );
}
export default SellableItemManageButtons;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
