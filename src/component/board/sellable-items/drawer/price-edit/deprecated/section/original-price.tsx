import styled from 'styled-components';

import BaseEditForm from '@src/components/organisms/Form/base';
import {useBoardContext} from '@src/contexts/Board';

function OriginalPriceEditSection() {
  const {
    state: {selectedData},
  } = useBoardContext();

  const handleSaveClick = (value) => {
    console.log('edit price (originalPrice): ', value);
  };

  return (
    <Wrapper>
      <BaseEditForm
        FORM_ITEMS={{
          originalPrice: {
            label: '정가 (단위: 원)',
            rules: [
              {
                required: true,
                message: '정가를 입력해주세요',
              },
            ],
            type: 'number',
          },
        }}
        defaultValue={selectedData}
        onSaveClick={handleSaveClick}
        style={{width: '100%'}}
        buttonAlign="right"
      />
    </Wrapper>
  );
}

export default OriginalPriceEditSection;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
