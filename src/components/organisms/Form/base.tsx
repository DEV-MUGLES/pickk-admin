import React, {useEffect} from 'react';
import styled from 'styled-components';
import {
  Form,
  Input,
  Button,
  Modal,
  FormItemProps,
  InputNumber,
  Switch,
  FormProps,
} from 'antd';

import {Space} from '@src/components/atoms';

const {confirm} = Modal;

export type FormItemValueType = FormItemProps & {
  type?: 'string' | 'number' | 'boolen';
  Component?: React.ElementType;
};

export type ButtonAlignType = 'left' | 'right' | 'center';

export type BaseEditFormProps = {
  FORM_ITEMS: {[name: string]: FormItemValueType};
  defaultValue?: {[name: string]: any};
  onSaveClick: (value: any) => void;
  onDeleteClick?: () => void;
  buttonAlign?: ButtonAlignType;
  submitButtonText?: string;
  deleteButtonText?: string;
  hasDeleteButton?: boolean;
} & Omit<FormProps, 'form' | 'onFinish' | 'defaultValue'>;

function BaseEditForm({
  FORM_ITEMS,
  defaultValue,
  onSaveClick,
  onDeleteClick,
  buttonAlign,
  submitButtonText,
  deleteButtonText,
  hasDeleteButton = false,
  ...formProps
}: BaseEditFormProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(defaultValue);
  }, [defaultValue]);

  const handleDelete = () => {
    confirm({
      title: `삭제하시겠습니까?`,
      onOk: () => onDeleteClick(),
    });
  };

  const handleFinish = (value) => {
    confirm({
      title: `변경 내용을 저장하시겠습니까?`,
      onOk: () => onSaveClick(value),
    });
  };

  const renderInput = (
    type: 'string' | 'number' | 'boolen',
    Component: React.ElementType,
  ) => {
    if (Component) {
      return <Component />;
    }

    const BaseInput =
      {
        string: Input,
        number: InputNumber,
        boolean: Switch,
      }[type] || Input;
    return <BaseInput />;
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      labelAlign="left"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 8,
      }}
      layout="horizontal"
      {...formProps}>
      {Object.keys(FORM_ITEMS).map((name) => (
        <Form.Item key={name} name={name} {...FORM_ITEMS[name]}>
          {renderInput(FORM_ITEMS[name].type, FORM_ITEMS[name].Component)}
        </Form.Item>
      ))}
      <Space level={2} />
      <ButtonWrapper align={buttonAlign ?? 'left'}>
        {hasDeleteButton && (
          <Button onClick={handleDelete}>{submitButtonText ?? '삭제'}</Button>
        )}
        <Button htmlType="submit" type="primary">
          {submitButtonText ?? '저장'}
        </Button>
      </ButtonWrapper>
    </Form>
  );
}

export default BaseEditForm;

const ButtonWrapper = styled.div<{align: ButtonAlignType}>`
  display: flex;
  ${({align}) =>
    `justify-content: ${
      {left: 'flex-start', center: 'center', right: 'flex-end'}[align]
    };`}
`;
