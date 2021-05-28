import {useState} from 'react';
import styled from 'styled-components';
import {Button, Table, Tooltip} from 'antd';
import {PlusOutlined, EditOutlined} from '@ant-design/icons';

import CreateOptionModal from './create-option-modal';
import {useBoardContext} from '@src/contexts/Board';
import {Items_items} from '@src/operations/__generated__/Items';

function OptionManageSection() {
  const {
    state: {selectedData},
  } = useBoardContext();
  const options: Items_items['options'] = selectedData.options;
  const hasOption = options?.length > 0;
  const [buttonText, buttonIcon, warningMessage] = hasOption
    ? [
        '옵션 수정',
        <EditOutlined />,
        '옵션 수정시 기존 재고값이 모두 초기화 됩니다.',
      ]
    : ['옵션 추가', <PlusOutlined />, undefined];
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleModalOpen = (isOpen: boolean) => () => {
    setModalVisible(isOpen);
  };

  return (
    <>
      <Wrapper>
        <Tooltip title={warningMessage}>
          <Button
            onClick={handleModalOpen(true)}
            icon={buttonIcon}
            style={{marginBottom: '0.8rem'}}>
            {buttonText}
          </Button>
        </Tooltip>
        <Table
          columns={[
            {title: '옵션명', dataIndex: 'name', key: 'name'},
            {title: '옵션값', dataIndex: 'values', key: 'values'},
          ]}
          dataSource={options?.map(({name, values}) => ({
            key: name,
            name,
            values: values.map(
              ({name: oname}, i) => (i == 0 ? '' : ',') + oname,
            ),
          }))}
          pagination={false}
        />
      </Wrapper>
      {modalVisible && (
        <CreateOptionModal
          title={buttonText}
          visible={modalVisible}
          onClose={handleModalOpen(false)}
          warningMessage={warningMessage}
        />
      )}
    </>
  );
}

export default OptionManageSection;

const Wrapper = styled.div``;
