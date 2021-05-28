import {useMutation} from '@apollo/client';
import {Modal, message} from 'antd';
import dayjs from 'dayjs';

import BaseEditForm from '@src/components/organisms/Form/base';
import SellPriceInput from './sell-price-input';

import {useBoardContext} from '@src/contexts/Board';
import {
  ADD_ITEM_PRICE_MUTATION,
  UPDATE_ITEM_PRICE_MUTATION,
} from '@src/operations/item/mutation';
import {
  AddItemPrice,
  AddItemPriceVariables,
} from '@src/operations/__generated__/AddItemPrice';
import {
  UpdateItemPrice,
  UpdateItemPriceVariables,
} from '@src/operations/__generated__/UpdateItemPrice';

export type PriceFormModalType = 'add' | 'edit';

export type PriceFormModalProps = {
  type: PriceFormModalType;
  visible: boolean;
  onClose: () => void;
  selectedPriceId: number;
};

function PriceFormModal({
  type,
  visible,
  onClose,
  selectedPriceId,
}: PriceFormModalProps) {
  const {
    state: {selectedRowId, selectedData},
    action: {reload},
  } = useBoardContext();
  const [updateItemPrice] = useMutation<
    UpdateItemPrice,
    UpdateItemPriceVariables
  >(UPDATE_ITEM_PRICE_MUTATION.gql);
  const [addItemPrice] = useMutation<AddItemPrice, AddItemPriceVariables>(
    ADD_ITEM_PRICE_MUTATION.gql,
  );

  const handleAddItemPrice = (itemPriceInput) => {
    addItemPrice({
      variables: {
        itemId: selectedRowId,
        addItemPriceInput: itemPriceInput,
      },
    })
      .then(() => {
        message.success('새로운 가격을 추가했습니다.');
        onClose();
        reload();
      })
      .catch(() => {
        message.error('가격 추가를 실패했습니다.');
      });
  };

  const handleUpdateItemPrice = (_itemPriceInput) => {
    const {isActive, ...itemPriceInput} = _itemPriceInput;
    updateItemPrice({
      variables: {
        id: selectedPriceId,
        updateItemPriceInput: {
          ...itemPriceInput,
        },
      },
    })
      .then(() => {
        message.success('가격을 수정했습니다.');
        onClose();
        reload();
      })
      .catch(() => {
        message.error('가격 수정을 실패했습니다.');
      });
    onClose();
  };

  const [title, submitButtonText, defaultValue, showIsActive, handleSave]: [
    string,
    string,
    any,
    boolean,
    (input: any) => void,
  ] =
    type === 'add'
      ? ['가격 추가', '추가', undefined, true, handleAddItemPrice]
      : [
          '가격 수정',
          '저장',
          selectedData?.prices.find(({id}) => selectedPriceId === id),
          false,
          handleUpdateItemPrice,
        ];

  const basePrice = selectedData?.prices.find(({isBase}) => isBase);

  const checkValidate = (addItemPriceInput): boolean => {
    if (
      addItemPriceInput.endAt &&
      dayjs(addItemPriceInput.endAt).isBefore(addItemPriceInput.startAt)
    ) {
      message.error('종료일이 시작일보다 전일 수 없습니다.');
      return false;
    }

    const isDuplicatePeriod = selectedData?.prices.find(
      ({id, startAt, endAt}) => {
        if (type === 'edit' && id === selectedPriceId) {
          return false;
        }

        const notHasEndDate = !addItemPriceInput.endAt && !endAt;
        return (
          dayjs(addItemPriceInput.startAt).isSame(startAt, 'day') &&
          (dayjs(addItemPriceInput.endAt).isSame(endAt, 'day') || notHasEndDate)
        );
      },
    );
    if (isDuplicatePeriod) {
      message.error('이미 동일한 기간을 갖는 가격이 존재합니다.');
      return false;
    }

    return true;
  };

  const handleSaveButtonClick = (value) => {
    const {price: _p, ..._itemPriceInput} = value;
    const {
      price: {originalPrice, sellPrice},
      isCrawlUpdating,
    } = _p;
    const itemPriceInput = {
      ..._itemPriceInput,
      originalPrice,
      sellPrice,
      isCrawlUpdating,
    };

    if (!checkValidate(itemPriceInput)) {
      return;
    }

    handleSave(itemPriceInput);
  };

  const checkPriceEmpty = async (_, {price}) => {
    if (parseInt(price.originalPrice) > 0 && parseInt(price.sellPrice) > 0) {
      return;
    }

    throw new Error('정가와 판매가를 모두 입력해주세요');
  };

  return (
    <Modal visible={visible} title={title} onCancel={onClose} footer={false}>
      <BaseEditForm
        FORM_ITEMS={{
          price: {
            label: '가격 (단위: 원)',
            Component: SellPriceInput,
            inputProps: {
              basePrice,
              defaultValue: defaultValue,
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
          ...(showIsActive && {
            isActive: {
              label: '현재 가격으로 활성화하기',
              type: 'boolean',
            },
          }),
        }}
        defaultValue={defaultValue}
        onSaveClick={handleSaveButtonClick}
        buttonAlign="center"
        submitButtonText={submitButtonText}
        style={{width: '100%'}}
        wrapperCol={{}}
      />
    </Modal>
  );
}

export default PriceFormModal;
