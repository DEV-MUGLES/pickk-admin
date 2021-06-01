import {useEffect} from 'react';
import styled from 'styled-components';
import {useMutation} from '@apollo/client';
import {useForm} from 'antd/lib/form/Form';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Alert, Button, Form, Input, message, Modal, Space} from 'antd';

import {useBoardContext} from '@src/contexts/Board';
import {CREATE_ITEM_OPTION_SET_MUTATION} from '@src/operations/item/mutation';
import {
  CreateOptionSet,
  CreateOptionSetVariables,
} from '@src/operations/__generated__/CreateOptionSet';

export type CreateOptionModalProps = {
  title: string;
  visible: boolean;
  onClose: () => void;
  warningMessage?: string;
};

function CreateOptionModal({
  title,
  visible,
  onClose,
  warningMessage,
}: CreateOptionModalProps) {
  const {
    state: {selectedRowId, selectedData},
    action: {reload},
  } = useBoardContext();
  const [form] = useForm();

  const [createItemOptionSet] = useMutation<
    CreateOptionSet,
    CreateOptionSetVariables
  >(CREATE_ITEM_OPTION_SET_MUTATION);

  useEffect(() => {
    const defaultOption = selectedData.options?.map(({name, values}) => ({
      name,
      values: values.map(({name}) => name).join(', '),
    }));

    form.setFieldsValue({
      options: defaultOption,
    });
  }, []);

  const handleFinish = (value) => {
    const options = value.options?.map(({name, values}) => ({
      name,
      values: values
        .split(',')
        .map((v) => v.trim())
        .filter((v) => v),
    }));

    createItemOptionSet({
      variables: {
        id: selectedRowId,
        createItemOptionSetInput: {options},
      },
    })
      .then(() => {
        message.success('저장되었습니다.');
        onClose();
        reload();
      })
      .catch(() => message.error('저장에 실패했습니다.'));
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onClose}
      width={'60%'}
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
              {fields.map(({key, name, fieldKey, ...restField}) => (
                <Space
                  key={key}
                  style={{display: 'flex', marginBottom: 8}}
                  align="baseline"
                  size="middle">
                  <Form.Item
                    {...restField}
                    label="옵션명"
                    name={[name, 'name']}
                    fieldKey={[fieldKey, 'name']}
                    rules={[
                      {required: true, message: '옵션명을 입력해주세요'},
                    ]}>
                    <Input placeholder="옵션명" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="옵션값"
                    name={[name, 'values']}
                    fieldKey={[fieldKey, 'values']}
                    rules={[
                      {required: true, message: '옵션값을 입력해주세요'},
                    ]}>
                    <Input
                      placeholder="예시: 빨강, 노랑 또는 S, M, L (,로 구분)"
                      style={{width: '16rem'}}
                    />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={add}
                  block
                  icon={<PlusOutlined />}>
                  옵션 추가
                </Button>
              </Form.Item>
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
