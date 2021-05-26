import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {Button, Modal, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import dayjs from 'dayjs';

import BaseEditForm from '@src/components/organisms/Form/base';
import SellPriceInput from './sell-price-input';

import {useBoardContext} from '@src/contexts/Board';
import {ADD_ITEM_PRICE_MUTATION} from '@src/operations/item/mutation';
import {
  AddItemPrice,
  AddItemPriceVariables,
} from '@src/operations/__generated__/AddItemPrice';

function PriceAddButton() {
  const {
    state: {selectedRowId, selectedData},
    action: {reload},
  } = useBoardContext();

  const [visible, setVisible] = useState(false);
  const [addItemPrice] = useMutation<AddItemPrice, AddItemPriceVariables>(
    ADD_ITEM_PRICE_MUTATION.gql,
  );

  const handleAddButtonClick = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const checkValidate = (addItemPriceInput): boolean => {
    if (dayjs(addItemPriceInput.endAt).isBefore(addItemPriceInput.startAt)) {
      message.error('종료일이 시작일보다 전일 수 없습니다.');
      return;
    }

    return true;
  };

  const handleSaveButtonClick = (value) => {
    const {price: _p, ..._addItemPriceInput} = value;
    const {
      price: {originalPrice, sellPrice},
      isCrawlUpdating,
    } = _p;
    const addItemPriceInput = {
      ..._addItemPriceInput,
      originalPrice,
      sellPrice,
      isCrawlUpdating,
    };

    if (!checkValidate(addItemPriceInput)) {
      return;
    }

    addItemPrice({
      variables: {
        itemId: selectedRowId,
        addItemPriceInput,
      },
    })
      .then(() => {
        message.success('새로운 가격을 추가했습니다.');
        handleClose();
        reload();
      })
      .catch(() => {
        message.error('가격 추가를 실패했습니다.');
      });
  };

  const checkPriceEmpty = (_, {price}) => {
    console.log(price);
    if (parseInt(price.originalPrice) > 0 && parseInt(price.sellPrice) > 0) {
      return Promise.resolve();
    }

    return Promise.reject(new Error('정가와 판매가를 모두 입력해주세요'));
  };

  return (
    <>
      <Button icon={<PlusOutlined />} onClick={handleAddButtonClick}>
        가격 추가
      </Button>
      <Modal
        visible={visible}
        title="가격 추가"
        onCancel={handleClose}
        footer={false}>
        <BaseEditForm
          FORM_ITEMS={{
            price: {
              label: '가격 (단위: 원)',
              Component: SellPriceInput,
              inputProps: {
                defaultPrice: {
                  originalPrice: selectedData?.originalPrice,
                  sellPrice: selectedData?.sellPrice,
                },
              },
              rules: [
                {required: true, message: '정가와 판매가를 모두 입력해주세요'},
                {
                  validator: checkPriceEmpty,
                },
              ],
            },
            startAt: {
              label: '시작일',
              type: 'date',
              rules: [{required: true, message: '시작일을 입력해주세요'}],
            },
            endAt: {
              label: '종료일',
              type: 'date',
            },
            isActive: {
              label: '현재 가격으로 활성화하기',
              type: 'boolean',
            },
          }}
          defaultValue={{}}
          onSaveClick={handleSaveButtonClick}
          buttonAlign="center"
          style={{width: '100%'}}
          wrapperCol={{}}
        />
      </Modal>
    </>
  );
}

export default PriceAddButton;
