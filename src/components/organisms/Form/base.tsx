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

export type SubmitButtonType = {
  text?: string;
  align?: 'left' | 'right' | 'center';
};

export type BaseEditFormProps = {
  FORM_ITEMS: {[name: string]: FormItemValueType};
  onSaveClick: (value: any) => void;
  defaultValue: {[name: string]: any};
  submitButton?: SubmitButtonType;
} & Omit<FormProps, 'form' | 'onFinish' | 'defaultValue'>;

function BaseEditForm({
  FORM_ITEMS,
  onSaveClick,
  defaultValue,
  submitButton,
  ...formProps
}: BaseEditFormProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(defaultValue);
  }, [defaultValue]);

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
      <ButtonWrapper align={submitButton?.align ?? 'left'}>
        <Button htmlType="submit" type="primary">
          {submitButton?.text ?? '저장'}
        </Button>
      </ButtonWrapper>
    </Form>
  );
}

export default BaseEditForm;

const ButtonWrapper = styled.div<{align: SubmitButtonType['align']}>`
  display: flex;
  ${({align}) =>
    `justify-content: ${
      {left: 'flex-start', center: 'center', right: 'flex-end'}[align]
    };`}
`;
