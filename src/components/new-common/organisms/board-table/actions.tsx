import {Fragment} from 'react';
import styled from 'styled-components';
import {Button} from 'antd';
import {palette} from '@pickk/design-token';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0.4rem 0.8rem 0 0.4rem;
  margin-top: 0.4rem;
  border-top: 1px solid ${palette.gray2};

  & > * {
    margin-right: 0.4rem;
  }
`;

export type TableActionType<DataType = unknown> = {
  text?: string;
  onClick?: () => Promise<unknown>;
  Component?: React.FunctionComponent<unknown>;
};

export type BoardTableActionsProps = {
  actions: TableActionType[];
  isDisabled?: boolean;
};

export default function BoardTableActions({
  actions,
  isDisabled,
}: BoardTableActionsProps) {
  const renderActionButtons = () => {
    return actions.map(({Component, text, onClick}, index) => (
      <Fragment key={'action_' + index}>
        {!!Component ? (
          <Component />
        ) : (
          <Button onClick={onClick} disabled={isDisabled}>
            {text}
          </Button>
        )}
      </Fragment>
    ));
  };

  return <StyledWrapper>{renderActionButtons()}</StyledWrapper>;
}
