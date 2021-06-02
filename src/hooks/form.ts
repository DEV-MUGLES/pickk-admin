import {Form, FormInstance} from 'antd';
import {useEffect} from 'react';

export const useBaseForm = (defaultValue: any): FormInstance => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(defaultValue);
  }, [defaultValue]);

  return form;
};
