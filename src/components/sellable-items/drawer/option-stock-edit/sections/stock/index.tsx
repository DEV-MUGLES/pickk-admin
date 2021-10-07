import {useState} from 'react';
import {Button, message, Table, Modal} from 'antd';

import {useBoardContext} from '@src/common/contexts/Board';

import {stockColumns} from './columns';
import ShippingReservePolicyModal from './shipping-reserve-policy-modal';
import {useToggleIsInfiniteStock} from './hooks';

const {confirm} = Modal;

function StockManageSection() {
  const [modalVisible, setModalVisible] = useState(false);
  const {toggleIsInfiniteStock: toggle} = useToggleIsInfiniteStock();
  const {
    state: {selectedRowId, selectedData},
  } = useBoardContext();

  const {isInfiniteStock} = selectedData;
  const [buttonText, confirmText] = !isInfiniteStock
    ? ['전체 무한재고로 설정', '전체 상품을 무한재고로 설정하시겠습니까?']
    : ['전체 무한재고 설정 취소', '전체 상품을 무한재고에서 해제하시겠습니까?'];

  const toggleIsInfiniteStock = (input: boolean) => () => {
    confirm({
      title: confirmText,
      onOk: async () => {
        try {
          await toggle(selectedRowId, input);
          message.success('설정했습니다.');
        } catch (err) {
          message.error('저장에 실패했습니다. err - ' + err);
        }
      },
    });
  };

  const handleModalOpen = (isOpen: boolean) => () => {
    setModalVisible(isOpen);
  };

  return (
    <>
      <Button
        style={{marginBottom: '0.8rem'}}
        onClick={toggleIsInfiniteStock(!isInfiniteStock)}>
        {buttonText}
      </Button>
      <Table
        columns={stockColumns}
        dataSource={
          selectedData
            ? [...selectedData.products]
                .sort((a, b) => a.createdAt - b.createdAt)
                .filter(({isDeleted}) => !isDeleted)
            : []
        }
      />
      <ShippingReservePolicyModal
        visible={modalVisible}
        onClose={handleModalOpen(false)}
      />
    </>
  );
}

export default StockManageSection;
