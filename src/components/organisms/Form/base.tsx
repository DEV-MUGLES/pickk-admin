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

import DatePickerFormItem from './Items/date-picker';
import {Space} from '@src/components/atoms';

import {useBaseForm} from '@src/hooks/form';

const {confirm} = Modal;

export type BaseFormItemType = 'string' | 'number' | 'boolean' | 'date';
export type FormItemValueType = FormItemProps & {
  type?: BaseFormItemType;
  Component?: React.ElementType;
  inputProps?: any;
};

export type ButtonAlignType = 'left' | 'right' | 'center';

export type BaseFormProps = {
  FORM_ITEMS: {[name: string]: FormItemValueType};
  defaultValue?: {[name: string]: any};
  onSaveClick: (value: any) => void;
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
      onOk: () => onDeleteClick(),
    });
  };

  const renderInput = (
    type: BaseFormItemType,
    Component: React.ElementType,
    inputProps: any = {},
  ) => {
    if (Component) {
      return <Component {...inputProps} />;
    }

    const BaseInput =
      {
        string: Input,
        number: InputNumber,
        boolean: Switch,
        date: DatePickerFormItem,
      }[type] || Input;

    return <BaseInput {...inputProps} />;
  };

  const renderFormItem = (name: string) => {
    const {type, Component, inputProps} = FORM_ITEMS[name];
    return (
      <Form.Item
        key={name}
        name={name}
        style={{display: 'flex'}}
        {...FORM_ITEMS[name]}>
        {renderInput(type, Component, inputProps)}
      </Form.Item>
    );
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
      {Object.keys(FORM_ITEMS).map((name) => renderFormItem(name))}
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
