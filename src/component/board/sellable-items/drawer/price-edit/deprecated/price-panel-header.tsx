import styled from 'styled-components';
import Text from 'antd/lib/typography/Text';

import {INDIGO_BLUE} from '@src/components/atoms/colors';

import {useBoardContext} from '@src/contexts/Board';
import {addCommaToNumber} from '@src/lib/NumberParser';

export type PricePanelHeaderProps = {
  title: string;
  name: string;
  price?: number;
};

function PricePanelHeader({title, name, price = 0}: PricePanelHeaderProps) {
  const {
    state: {selectedData},
  } = useBoardContext();

  return (
    <Row>
      <Text>{title} 수정</Text>
      <Text>
        {title}:{' '}
        <Text style={{color: INDIGO_BLUE[500]}}>
          {addCommaToNumber(selectedData[name] ?? price)}
        </Text>{' '}
        원
      </Text>
    </Row>
  );
}

export default PricePanelHeader;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
