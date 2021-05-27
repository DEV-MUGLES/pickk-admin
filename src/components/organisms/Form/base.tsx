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
  Typography,
} from 'antd';

import DatePickerFormItem from './Items/date-picker';
import {Space} from '@src/components/atoms';

const {confirm} = Modal;
const {Text} = Typography;

export type BaseFormItemType = 'string' | 'number' | 'boolean' | 'date';
export type FormItemValueType = FormItemProps & {
  type?: BaseFormItemType;
  Component?: React.ElementType;
  inputProps?: any;
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
      <ButtonWrapper align={buttonAlign ?? 'left'}>
        {hasDeleteButton && (
          <Button onClick={handleDelete} style={{marginRight: '0.4rem'}}>
            {submitButtonText ?? '삭제'}
          </Button>
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
