import React from 'react';
import styled from 'styled-components';
import {
  Form,
  FormProps,
  FormItemProps,
  Button,
  Modal,
  Input,
  Switch,
  InputProps,
  SwitchProps,
} from 'antd';

import InputNumber, {InputNumberProps} from './Items/input-number';
import DatePickerFormItem, {DatePickerFormItemProps} from './Items/date-picker';
import {Space} from '@src/components/atoms';

import {useBaseForm} from '@src/hooks/form';

const {confirm} = Modal;

export type BaseFormItemType = 'string' | 'number' | 'boolean' | 'date';

export type CustomInputProps<T = unknown> = {
  value: T;
  onChange: (value: T) => void;
};

export type InputComponentType =
  | {
      type?: 'string';
      inputProps?: InputProps;
    }
  | {
      type: 'number';
      inputProps?: InputNumberProps;
    }
  | {
      type: 'boolean';
      inputProps?: SwitchProps;
    }
  | {
      type: 'date';
      inputProps?: DatePickerFormItemProps;
    }
  | {
      CustomInput: React.ElementType;
      inputProps?: Record<string, unknown>;
    };

export type BaseFormItemValueProps = FormItemProps & InputComponentType;

export type ButtonAlignType = 'left' | 'right' | 'center';

export type BaseFormProps = {
  FORM_ITEMS: Record<string, BaseFormItemValueProps>;
  defaultValue?: Record<string, unknown>;
  onSaveClick: (value: unknown) => void;
  onDeleteClick?: () => void;
  buttonAlign?: ButtonAlignType;
  submitButtonText?: string;
  deleteButtonText?: string;
  hasDeleteButton?: boolean;
} & Omit<FormProps, 'form' | 'onFinish' | 'defaultValue'>;

function BaseForm({
  FORM_ITEMS,
  defaultValue,
  onSaveClick,
  onDeleteClick,
  buttonAlign = 'left',
  submitButtonText = '저장',
  deleteButtonText = '삭제',
  hasDeleteButton = false,
  ...formProps
}: BaseFormProps) {
  const form = useBaseForm(defaultValue);

  const handleFinish = (value) => {
    confirm({
      title: `변경 내용을 저장하시겠습니까?`,
      onOk: () => {
        onSaveClick(value);
        form.resetFields();
      },
    });
  };

  const handleDelete = () => {
    confirm({
      title: `삭제하시겠습니까?`,
      onOk: onDeleteClick,
    });
  };

  const renderInput = (props: InputComponentType) => {
    if ('CustomInput' in props) {
      return <props.CustomInput {...props.inputProps} />;
    }

    const BaseInput: React.ElementType = {
      string: Input,
      number: InputNumber,
      boolean: Switch,
      date: DatePickerFormItem,
    }[props.type || 'string'];

    return <BaseInput {...props.inputProps} />;
  };

  const renderFormItems = () => {
    return Object.entries(FORM_ITEMS).map(([key, value]) => (
      <Form.Item
        key={key}
        name={key}
        style={{display: 'flex'}}
        {...(value as FormItemProps)}>
        {renderInput(value as InputComponentType)}
      </Form.Item>
    ));
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
      {renderFormItems()}
      <Space level={2} />
      <ButtonWrapper align={buttonAlign}>
        {hasDeleteButton && (
          <Button onClick={handleDelete} style={{marginRight: '0.4rem'}}>
            {deleteButtonText}
          </Button>
        )}
        <Button htmlType="submit" type="primary">
          {submitButtonText}
        </Button>
      </ButtonWrapper>
    </Form>
  );
}

export default BaseForm;

const ButtonWrapper = styled.div<{align: ButtonAlignType}>`
  display: flex;
  ${({align}) =>
    `justify-content: ${
      {left: 'flex-start', center: 'center', right: 'flex-end'}[align]
    };`}
`;
