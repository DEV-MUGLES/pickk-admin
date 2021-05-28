import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {Button, message, Table, Modal} from 'antd';

import {useBoardContext} from '@src/contexts/Board';
import {Items_items} from '@src/operations/__generated__/Items';
import {UPDATE_ITEM_MUTATION} from '@src/operations/item/mutation';
import {
  UpdateItem,
  UpdateItemVariables,
} from '@src/operations/__generated__/UpdateItem';

import {stockColumns} from './columns';
import ShippingReservePolicyModal from './shipping-reserve-policy-modal';

const {confirm} = Modal;

function StockManageSection() {
  const [modalVisible, setModalVisible] = useState(false);
  const [updateItem] = useMutation<UpdateItem, UpdateItemVariables>(
    UPDATE_ITEM_MUTATION.gql,
  );
  const {
    state: {selectedRowId, selectedData},
    action: {reload},
  } = useBoardContext();
  const products: Items_items['products'] = selectedData.products;

  const {isInfiniteStock} = selectedData;
  const [buttonText, newIsInfiniteStock, confirmText] = !isInfiniteStock
    ? ['전체 무한재고로 설정', true, '전체 상품을 무한재고로 설정하시겠습니까?']
    : [
        '전체 무한재고 설정 취소',
        false,
        '전체 상품을 무한재고에서 해제하시겠습니까?',
      ];

  const handleInfiniteSettingButtonClick = (value: boolean) => () => {
    confirm({
      title: confirmText,
      onOk: () => {
        updateItem({
          variables: {
            itemId: selectedRowId,
            updateItemInput: {
              isInfiniteStock: value,
            },
          },
        })
          .then(() => {
            message.success('설정했습니다.');
            reload();
          })
          .catch(() => message.error('설정에 실패했습니다.'));
      },
    });
  };

  const handleModalOpen = (isOpen: boolean) => () => {
    setModalVisible(isOpen);
  };

  const newStockColumns = [
    ...stockColumns,
    {
      title: '예약발송',
      dataIndex: '',
      key: '',
      render: (_, {id}) => <Button size="small">예약발송</Button>,
    },
  ];

  return (
    <>
      <Button
        style={{marginBottom: '0.8rem'}}
        onClick={handleInfiniteSettingButtonClick(newIsInfiniteStock)}>
        {buttonText}
      </Button>
      <Table columns={newStockColumns} dataSource={products} />
      <ShippingReservePolicyModal
        visible={modalVisible}
        onClose={handleModalOpen(false)}
      />
    </>
  );
}

export default StockManageSection;
