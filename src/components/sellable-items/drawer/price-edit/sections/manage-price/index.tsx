import {useState} from 'react';
import dayjs from 'dayjs';
import {Button, Space, Table, Modal} from 'antd';
import {ColumnsType} from 'antd/lib/table';
import {PlusOutlined} from '@ant-design/icons';
import {Item} from '@pickk/common';

import PriceFormModal, {PriceFormModalType} from './modal';

import {useBoardContext} from '@src/common/contexts/Board';
import {useRemoveItemPrice} from '@src/common/hooks/apis';
import {stringSorter} from '@src/common/helpers';

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
  const [removeItemPrice] = useRemoveItemPrice();

  const filteredPrices: Item['prices'] = selectedData?.prices
    ?.filter(({isBase, startAt}) => !isBase && dayjs(startAt).isAfter(dayjs()))
    .sort((a, b) => stringSorter(a.startAt, b.startAt));

  const [isTableVisible, addButtonText]: [boolean, string] =
    filteredPrices?.length > 0
      ? [true, '가격 수동설정']
      : [false, '가격 예약설정'];

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

  const newItemPricesColumns: ColumnsType = [
    ...itemPricesColumns,
    {
      title: '가격 설정',
      dataIndex: 'setting',
      key: 'setting',
      render: (_, {id}) => (
        <Space>
          <Button size="small" onClick={handleEditClick(id)}>
            수정
          </Button>
          <Button size="small" onClick={handleDeleteClick(id)} danger>
            삭제
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {isTableVisible && (
        <Table dataSource={filteredPrices} columns={newItemPricesColumns} />
      )}
      <Button icon={<PlusOutlined />} onClick={handleOpenModal(true, 'add')}>
        {addButtonText}
      </Button>
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
