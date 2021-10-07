import {useState, Fragment} from 'react';
import {Button, Table, Tooltip} from 'antd';
import {PlusOutlined, EditOutlined} from '@ant-design/icons';

import {useBoardContext} from '@src/common/contexts/Board';

import {CreateOptionModal, OptionNameEditModal} from './modal';

export type ModalType = 'createOption' | 'nameEdit';

function OptionManageSection() {
  const {
    state: {selectedRowId, selectedData},
  } = useBoardContext();
  const [modalVisible, setModalVisible] = useState<Record<ModalType, boolean>>({
    createOption: false,
    nameEdit: false,
  });
  const [selectedOptionId, setSelectedOptionId] = useState<number>();

  const hasOption = selectedData.options?.length > 0;
  const [buttonText, ButtonIcon, warningMessage] = hasOption
    ? [
        '옵션 수정',
        EditOutlined,
        '옵션 수정시 기존 재고값이 모두 초기화 됩니다.',
      ]
    : ['옵션 추가', PlusOutlined, undefined];

  const handleModalOpen = (type: ModalType) => (isOpen: boolean) => () => {
    setModalVisible({
      ...modalVisible,
      [type]: isOpen,
    });
  };

  return (
    <>
      <Tooltip title={warningMessage}>
        <Button
          onClick={handleModalOpen('createOption')(true)}
          icon={<ButtonIcon />}
          style={{marginBottom: '0.8rem'}}>
          {buttonText}
        </Button>
      </Tooltip>
      <Table
        columns={[
          {
            title: '옵션명',
            dataIndex: 'name',
            key: 'name',
            render: (value, {id}) => (
              <Fragment key={id}>
                {value}
                <Button
                  size="small"
                  style={{marginLeft: '0.8rem'}}
                  onClick={() => {
                    handleModalOpen('nameEdit')(true)();
                    setSelectedOptionId(id);
                  }}>
                  수정
                </Button>
              </Fragment>
            ),
          },
          {title: '옵션값', dataIndex: 'values', key: 'values'},
        ]}
        dataSource={
          selectedData
            ? [...selectedData.options]
                ?.sort((a, b) => a.order - b.order)
                .map(({id, name, values}) => ({
                  key: name,
                  id,
                  name,
                  values: values.map(({name}) => name).join(', '),
                }))
            : []
        }
        pagination={false}
      />
      {modalVisible.createOption && (
        <CreateOptionModal
          title={buttonText}
          visible={modalVisible.createOption}
          onClose={handleModalOpen('createOption')(false)}
          warningMessage={warningMessage}
          itemId={selectedRowId}
          defaultOption={selectedData?.options?.map(({name, values}) => ({
            name,
            values: values.map(({name, priceVariant = 0}) => ({
              name,
              priceVariant,
            })),
          }))}
        />
      )}
      {modalVisible.nameEdit && (
        <OptionNameEditModal
          optionId={selectedOptionId}
          visible={modalVisible.nameEdit}
          onClose={handleModalOpen('nameEdit')(false)}
        />
      )}
    </>
  );
}

export default OptionManageSection;
