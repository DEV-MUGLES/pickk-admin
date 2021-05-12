import React, {useEffect} from 'react';
import styled from 'styled-components';
import {
  Button,
  PageHeader,
  Form,
  Input,
  FormItemProps,
  message,
  Modal,
} from 'antd';
import {gql, useQuery} from '@apollo/client';
import {
  BASE_SELLER_FRAG,
  UpdateSellerInput,
  useUpdateMeSeller,
} from '@pickk/common';

import MainLayout from '@src/components/templates/MainLayout';
import {WHITE} from '@src/components/atoms/colors';
import {Space} from '@src/components/atoms';

const {confirm} = Modal;

const FORM_ITEMS: {
  [Property in keyof UpdateSellerInput]: FormItemProps;
} = {
  businessName: {
    label: '회사명',
    required: true,
  },
  businessCode: {
    label: '사업자등록번호',
    required: true,
    rules: [
      {
        pattern: /\d{3}-\d{2}-\d{5}/g,
        message: '***-**-***** 형식에 맞춰 작성해주세요',
      },
    ],
  },
  mailOrderBusinessCode: {
    label: '통신판매업 번호',
    required: true,
  },
  representativeName: {
    label: '대표자명',
    required: true,
  },
  operationTimeMessage: {
    label: '고객센터 운영시간',
    required: true,
  },
  phoneNumber: {
    label: '고객센터 번호',
    required: true,
  },
  email: {
    label: '이메일',
    required: true,
    rules: [
      {
        pattern:
          /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/g,
        message: '이메일 형식에 맞게 작성해주세요',
      },
    ],
  },
  kakaoTalkCode: {
    label: '카카오톡 문의 id',
  },
};

const BASE_ME_SELLER_QUERY = gql`
  ${BASE_SELLER_FRAG}
  query MeSeller {
    meSeller {
      ...BaseSellerFrag
    }
  }
`;

function MyPageEditPage() {
  const [form] = Form.useForm();
  const {data, refetch: refetchMeSeller} = useQuery(BASE_ME_SELLER_QUERY);
  const [updateMe] = useUpdateMeSeller();

  useEffect(() => {
    refetchMeSeller()?.then(({data}) => {
      form.setFieldsValue(data.meSeller);
    });
  }, []);

  const handleSaveClick = () => {
    confirm({
      title: '변경 내용을 저장하시겠습니까?',
      onOk: () => form.submit(),
    });
  };

  const handleFinish = (updateSellerInput) => {
    updateMe({
      variables: {
        updateSellerInput,
      },
    })
      .then(() => {
        message.success('저장되었습니다.');
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
      });
  };

  return (
    <MainLayout>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="내 정보"
        subTitle="정보 수정 후 저장 버튼을 눌러주세요."
        extra={[
          <Button key="1" type="primary" onClick={handleSaveClick}>
            저장
          </Button>,
        ]}
      />
      <Space level={2} />
      <Wrapper>
        <Form
          form={form}
          onFinish={handleFinish}
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 8,
            offset: 1,
          }}
          layout="horizontal"
          defaultValue={data?.meSeller}>
          {Object.keys(FORM_ITEMS).map((name) => (
            <Form.Item name={name} {...FORM_ITEMS[name]}>
              <Input />
            </Form.Item>
          ))}
        </Form>
      </Wrapper>
    </MainLayout>
  );
}

export default MyPageEditPage;

export const Wrapper = styled.div`
  background-color: ${WHITE};
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
`;
