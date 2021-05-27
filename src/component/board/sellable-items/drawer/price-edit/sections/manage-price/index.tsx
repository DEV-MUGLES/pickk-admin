import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {Button, Space, Table, Tooltip, Modal} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

import PriceFormModal, {PriceFormModalType} from './modal';

import {useBoardContext} from '@src/contexts/Board';
import {
  ACTIVATE_ITEM_PRICE_MUTATION,
  REMOVE_ITEM_PRICE_MUTATION,
} from '@src/operations/item/mutation';
import {
  ActivateItemPrice,
  ActivateItemPriceVariables,
} from '@src/operations/__generated__/ActivateItemPrice';
import {
  RemoveItemPrice,
  RemoveItemPriceVariables,
} from '@src/operations/__generated__/RemoveItemPrice';

import {itemPricesColumns} from './columns';

const {confirm} = Modal;

function ManagePriceSection() {
  const {
    state: {selectedRowId, selectedData},
    action: {reload},
  } = useBoardContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<PriceFormModalType>();
  const [selectedPriceId, setSelectedPriceId] = useState<number>();

  const [removeItemPrice] = useMutation<
    RemoveItemPrice,
    RemoveItemPriceVariables
  >(REMOVE_ITEM_PRICE_MUTATION.gql);
  const [activateItemPrice] = useMutation<
    ActivateItemPrice,
    ActivateItemPriceVariables
  >(ACTIVATE_ITEM_PRICE_MUTATION.gql);

  const handleOpenModal =
    (isOpen: boolean, type?: PriceFormModalType) => () => {
      setModalVisible(isOpen);
      type && setModalType(type);
    };

  const handleEditClick = (priceId: number) => () => {
    setSelectedPriceId(priceId);
    handleOpenModal(true, 'edit')();
  };

  const handleDeleteClick = (priceId: number) => () => {
    confirm({
      title: '선택한 가격을 삭제하시겠습니까?',
      onOk() {
        removeItemPrice({
          variables: {
            itemId: selectedRowId,
            priceId,
          },
        }).then(reload);
      },
    });
  };

  const handleAcitvateClick = (priceId: number) => () => {
    confirm({
      title: '선택한 가격으로 활성화하시겠습니까?',
      onOk() {
        activateItemPrice({
          variables: {
            itemId: selectedRowId,
            priceId,
          },
        }).then(reload);
      },
    });
  };

  return (
    <>
      <Button icon={<PlusOutlined />} onClick={handleOpenModal(true, 'add')}>
        가격 추가
      </Button>
      <Table
        dataSource={selectedData?.prices}
        columns={[
          ...itemPricesColumns,
          {
            title: '가격 설정',
            dataIndex: 'setting',
            key: 'setting',
            fixed: 'right',
            width: 200,
            render: (_, {id, isBase}) => (
              <Space>
                <Button size="small" onClick={handleEditClick(id)}>
                  수정
                </Button>
                {!isBase && (
                  <Button size="small" onClick={handleDeleteClick(id)}>
                    삭제
                  </Button>
                )}
                <Tooltip title="활성 가격으로 설정합니다.">
                  <Button
                    type="primary"
                    size="small"
                    onClick={handleAcitvateClick(id)}>
                    활성화
                  </Button>
                </Tooltip>
              </Space>
            ),
          },
        ]}
        style={{marginTop: '0.8rem'}}
        scroll={{x: 1000}}
      />
      {modalVisible && (
        <PriceFormModal
          type={modalType}
          visible={modalVisible}
          onClose={handleOpenModal(false)}
          selectedPriceId={selectedPriceId}
        />
      )}
    </>
  );
}

export default ManagePriceSection;
