import React, {useEffect} from 'react';
import {
  Form,
  Input,
  Button,
  Modal,
  FormItemProps,
  InputNumber,
  Switch,
} from 'antd';

import {Space} from '@src/components/atoms';

const {confirm} = Modal;

export type FormItemValueType = FormItemProps & {
  type?: 'string' | 'number' | 'boolen';
};

export type BaseEditFormProps = {
  FORM_ITEMS: {[name: string]: FormItemValueType};
  onSaveClick: (value: any) => void;
  defaultValue: {[name: string]: any};
};

function BaseEditForm({
  FORM_ITEMS,
  onSaveClick,
  defaultValue,
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

  const renderInput = (type: 'string' | 'number' | 'boolen') => {
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
        span: 6,
      }}
      wrapperCol={{
        span: 8,
      }}
      layout="horizontal">
      {Object.keys(FORM_ITEMS).map((name) => (
        <Form.Item key={name} name={name} {...FORM_ITEMS[name]}>
          {renderInput(FORM_ITEMS[name].type)}
        </Form.Item>
      ))}
      <Space level={2} />
      <Button htmlType="submit" type="primary">
        저장
      </Button>
    </Form>
  );
}

export default BaseEditForm;
