import {useEffect} from 'react';
import styled from 'styled-components';
import {Typography, Button, Space, Form, Divider} from 'antd';
import {palette} from '@pickk/design-token';

import {BoardFilterProps} from './board-filter.types';

const {Title} = Typography;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0.8rem 1.2rem;
  margin-bottom: 0.8rem;

  background-color: ${palette.white};
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;

  padding: 0.8rem 4rem;
`;

const StyledFooter = styled(Space)`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export default function BoardFilter(props: BoardFilterProps) {
  const {defaultFilter = {}, onFilterChange, inputs} = props;

  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(defaultFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultFilter]);

  const handleSubmit = (newFilter: any) => {
    Object.keys(newFilter).map((key) => {
      if (newFilter[key] === undefined) {
        delete newFilter[key];
      }
    });

    onFilterChange(newFilter);
  };

  const initFilter = () => {
    form.resetFields();
  };

  const renderInputs = () => {
    return inputs.map(({name, label, Component, guideText}) => (
      <>
        <Form.Item
          key={label}
          name={name}
          label={label}
          extra={guideText}
          labelCol={{
            xs: {span: 24},
            sm: {span: 5},
          }}
          labelAlign="left"
          colon={false}
          style={{marginBottom: 0}}>
          <Component />
        </Form.Item>
        <Divider style={{margin: '0.6rem 0'}} />
      </>
    ));
  };

  return (
    <StyledWrapper>
      <Title level={5}>필터</Title>
      <StyledForm form={form} onFinish={handleSubmit}>
        {renderInputs()}
        <StyledFooter>
          <Button htmlType="submit" type="primary">
            적용
          </Button>
          <Button onClick={initFilter}>초기화</Button>
        </StyledFooter>
      </StyledForm>
    </StyledWrapper>
  );
}
