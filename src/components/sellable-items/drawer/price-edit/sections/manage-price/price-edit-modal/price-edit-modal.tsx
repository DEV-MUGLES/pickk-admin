import {Modal, message} from 'antd';
import {Item, AddItemPriceInput} from '@pickk/common';

import BaseForm from '@src/components/common/organisms/Form/base';
import StartAtInput from './start-at-input';

import {useBoardContext} from '@src/common/contexts/Board';
import {useAddItemPrice, useUpdateItemPrice} from '@src/common/hooks/apis';
import {
  isBeforeDate,
  isDateIncluded,
  isSameDate,
} from '@src/common/helpers/date';

import {FORM_ITEMS} from './form-items';
import {PriceEditModalProps} from './price-edit-modal.types';

export default function PriceEditModal({
  type,
  visible,
  onClose,
  selectedPriceId,
}: PriceEditModalProps) {
  const {
    state: {selectedRowId, selectedData},
    action: {reload},
  } = useBoardContext();
  const filteredPrices: Item['prices'] = selectedData?.prices?.filter(
    ({isBase, endAt}) => !isBase && isBeforeDate(new Date(), endAt),
  );

  const {addItemPrice} = useAddItemPrice();
  const [updateItemPrice] = useUpdateItemPrice();

  const handleAddItemPrice = async (_addItemPriceInput: AddItemPriceInput) => {
    const addItemPriceInput = {
      ..._addItemPriceInput,
      isCrawlUpdating: false,
      isActive: isSameDate(_addItemPriceInput.startAt, new Date()),
    };

    try {
      await addItemPrice({
        variables: {
          itemId: selectedRowId,
          addItemPriceInput,
        },
      });

      message.success('새로운 가격을 추가했습니다.');
      reload();
      onClose();
    } catch (err) {
      message.error('가격 추가를 실패했습니다. err - ', err);
    }
  };

  const handleUpdateItemPrice = async (formInput: AddItemPriceInput) => {
    const {isActive, ...updateItemPriceInput} = formInput;

    try {
      await updateItemPrice({
        variables: {
          id: selectedPriceId,
          updateItemPriceInput,
        },
      });

      message.success('가격을 수정했습니다.');
      reload();
      onClose();
    } catch (err) {
      message.error('가격 수정을 실패했습니다. err - ', err);
    }
  };

  const [title, submitButtonText, defaultValue, handleSave]: [
    string,
    string,
    AddItemPriceInput,
    (input: AddItemPriceInput) => void,
  ] =
    type === 'add'
      ? ['가격 추가', '추가', undefined, handleAddItemPrice]
      : [
          '가격 수정',
          '저장',
          filteredPrices.find(({id}) => selectedPriceId === id),
          handleUpdateItemPrice,
        ];

  const validateDate = (formInput: AddItemPriceInput): boolean => {
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

  const handleSaveButtonClick = (value: AddItemPriceInput) => {
    if (!validateDate(value)) {
      return;
    }

    // @TODO 할인률 -> 임시
    handleSave({...value, pickkDiscountRate: 5});
  };

  return (
    <Modal
      visible={visible}
      title={title}
      onCancel={onClose}
      footer={false}
      width="80%">
      {/** @TODO 할인률 -> 임시 */}
      <p>[판매가에서 핔 할인률 5%가 적용됩니다.]</p>
      <BaseForm
        FORM_ITEMS={{
          ...FORM_ITEMS,
          startAt: {
            label: '시작일',
            CustomInput: StartAtInput,
            inputProps: {
              hideCheckbox: type === 'edit',
            },
            rules: [{required: true, message: '시작일을 입력해주세요'}],
          },
          endAt: {
            label: '종료일',
            type: 'date',
            inputProps: {
              isEndOfDay: true,
            },
          },
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
