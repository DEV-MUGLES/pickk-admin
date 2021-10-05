import {useEffect} from 'react';
import styled from 'styled-components';
import {Alert, Button, Form, message, Modal} from 'antd';
import {useForm} from 'antd/lib/form/Form';
import {CreateItemOptionInput} from '@pickk/common';

import {OptionFormItem, OptionAddButton} from './form-items';

import {useCreateItemOptionSet} from './hooks';

export type CreateOptionModalProps = {
  title: string;
  visible: boolean;
  onClose: () => void;
  warningMessage?: string;
  itemId: number;
  defaultOption: CreateItemOptionInput;
};

function CreateOptionModal({
  title,
  visible,
  onClose,
  warningMessage,
  itemId,
  defaultOption,
}: CreateOptionModalProps) {
  const [form] = useForm();
  const {createItemOptionSet} = useCreateItemOptionSet();

  useEffect(() => {
    form.setFieldsValue({
      options: defaultOption,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFinish = async (value) => {
    const options: CreateItemOptionInput[] = value.options?.map(
      ({name, values}) => ({
        name,
        values: values?.map((value) => ({
          name: value.name,
          priceVariant: parseInt(value.priceVariant) || 0,
        })),
      }),
    );

    if (options.find(({values}) => !values?.length)) {
      message.warning('한개 이상의 옵션값을 입력해주세요.');
      return;
    }

    try {
      await createItemOptionSet(itemId, options);

      message.success('저장되었습니다.');
      onClose();
    } catch (err) {
      message.error('저장에 실패했습니다. err - ' + err);
    }
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onClose}
      width={'80%'}
      footer={false}>
      {warningMessage && (
        <Alert
          showIcon
          message={warningMessage}
          type="warning"
          style={{marginBottom: '1.6rem'}}
        />
      )}
      <Form form={form} onFinish={handleFinish}>
        <Form.List name="options">
          {(fields, {add, remove}) => (
            <>
              {fields.map((props) => (
                <OptionFormItem
                  key={props.key}
                  {...props}
                  onRemoveClick={() => remove(props.name)}
                />
              ))}
              <OptionAddButton onAddClick={add} />
            </>
          )}
        </Form.List>
        <Form.Item style={{marginTop: '4rem'}}>
          <ButtonWrapper>
            <Button type="primary" htmlType="submit" style={{width: '6rem'}}>
              저장
            </Button>
          </ButtonWrapper>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateOptionModal;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
