import {Modal, message} from 'antd';
import {AddItemPriceInput, Item} from '@pickk/common';

import BaseForm from '@src/components/organisms/Form/base';

import {useBoardContext} from '@src/contexts/Board';
import {useAddItemPrice, useUpdateItemPrice} from '@src/hooks/apis/item';
import {isBeforeDate, isDateIncluded, isSameDate} from '@src/lib/date';

import {FORM_ITEMS} from './form-items';

export type PriceFormModalType = 'add' | 'edit';
export type PriceFormModalProps = {
  type: PriceFormModalType;
  visible: boolean;
  onClose: () => void;
  selectedPriceId: number;
};

export type PriceFormValueType = AddItemPriceInput;

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
  const filteredPrices: Item['prices'] = selectedData?.prices?.filter(
    ({isBase, endAt}) => !isBase && isBeforeDate(new Date(), endAt),
  );

  const [addItemPrice] = useAddItemPrice();
  const [updateItemPrice] = useUpdateItemPrice();

  const handleAddItemPrice = (addItemPriceInput: PriceFormValueType) => {
    addItemPrice({
      variables: {
        itemId: selectedRowId,
        addItemPriceInput: {
          ...addItemPriceInput,
          isCrawlUpdating: false,
        },
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

  const handleUpdateItemPrice = (formInput: PriceFormValueType) => {
    const {isActive, ...updateItemPriceInput} = formInput;
    updateItemPrice({
      variables: {
        id: selectedPriceId,
        updateItemPriceInput,
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
  };

  const [title, submitButtonText, defaultValue, handleSave]: [
    string,
    string,
    AddItemPriceInput,
    (input: PriceFormValueType) => void,
  ] =
    type === 'add'
      ? ['가격 추가', '추가', undefined, handleAddItemPrice]
      : [
          '가격 수정',
          '저장',
          filteredPrices.find(({id}) => selectedPriceId === id),
          handleUpdateItemPrice,
        ];

  const validateDate = (formInput: PriceFormValueType): boolean => {
    const {startAt, endAt} = formInput;
    if (isBeforeDate(startAt, new Date())) {
      message.error('시작일은 금일 이전일 수 없습니다.');
      return false;
    }

    if (endAt && isBeforeDate(endAt, startAt)) {
      message.error('종료일이 시작일보다 전일 수 없습니다.');
      return false;
    }

    // 겹치는 기간을 가진 가격이 있는지 확인
    const hasOverlapPeriod = filteredPrices
      .filter(({id}) => id !== selectedPriceId)
      .find((price) => {
        const isStartAtIncluded = isDateIncluded(
          startAt,
          price.startAt,
          price.endAt,
        );
        const isEndAtIncluded = isDateIncluded(
          endAt,
          price.startAt,
          price.endAt,
        );
        const isIncludePrice =
          isDateIncluded(price.startAt, startAt, endAt) &&
          isDateIncluded(price.endAt, startAt, endAt);
        return isStartAtIncluded || isEndAtIncluded || isIncludePrice;
      });
    if (hasOverlapPeriod) {
      message.error('겹치는 기간을 갖는 가격이 존재합니다.');
      return false;
    }

    return true;
  };

  const handleSaveButtonClick = (value: PriceFormValueType) => {
    if (!validateDate(value)) {
      return;
    }

    handleSave(value);
  };

  return (
    <Modal visible={visible} title={title} onCancel={onClose} footer={false}>
      <BaseForm
        FORM_ITEMS={{
          ...FORM_ITEMS,
          ...(type === 'add' && {
            isActive: {
              label: '현재 가격으로 활성화하기',
              type: 'boolean',
            },
          }),
        }}
        defaultValue={{...defaultValue}}
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
