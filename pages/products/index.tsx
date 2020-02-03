import React, {useState} from 'react';
import { Input, Typography, DatePicker, Button, Modal } from 'antd';
import styled from 'styled-components';
import MainLayout from '@src/components/templates/MainLayout';
import Board from '@src/components/templates/Board';

import {BoardFilterProps} from '@src/components/organisms/Board/Filter';
import Datepicker from '@src/components/molecules/BoardFilter/input/DatePicker';
import SelectInput from '@src/components/molecules/BoardFilter/input/SelectInput';
import Selector from '@src/components/molecules/BoardFilter/input/Selector';
import InputBox from '@src/components/molecules/BoardFilter/input/InputBox';
import MultiChecker from '@src/components/molecules/BoardFilter/input/MultiChecker';
import ItemCategorySelector from '@src/components/molecules/BoardFilter/input/ItemCategorySelector';
import moment from 'moment';
import Space from '@src/components/atoms/space';
import Colors from '@src/components/atoms/colors';

const { Text } = Typography;
const {RangePicker} = DatePicker;
const { Search } = Input;

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const modalOpen = () => {
    setIsModalOpen(true);
  };
  const modalClose = e => {
    setIsModalOpen(false);
  };
  const handleSubmit = e => {
    setIsLoading(true);
  };

  const addModal = () => (
          <Modal
            visible={isModalOpen}
            title="Title"
            onOk={handleSubmit}
            onCancel={modalClose}
            footer={[
              <Button key="back" onClick={modalClose}>
                Return
              </Button>,
              <Button key="submit" type="primary" loading={isLoading} onClick={handleSubmit}>
                Submit
              </Button>,
            ]}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Modal>
      );

  const columns = [
    {
      title: '카테고리',
      dataIndex: 'itemMinorType',
      key: 'itemMinorType',
      sorter: (a, b) => a.itemMinorType > b.itemMinorType,
    },
    {
      title: '상품명',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
      sorter: (a, b) => a.name > b.name,
    },
    {
      title: '구독할인율',
      dataIndex: 'subscribeDiscountRate',
      key: 'subscribeDiscountRate',
      sorter: (a, b) => a.subscribeDiscountRate - b.subscribeDiscountRate,
    },
    {
      title: '구독할인기간',
      dataIndex: 'subscribeDiscountPeriod',
      key: 'subscribeDiscountPeriod',
      sorter: (a, b) => a.subscribeDiscountPeriod > b.subscribeDiscountPeriod,
    },
    {
      title: '상품번호',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id > b.id,
    },
    {
      title: '정가',
      dataIndex: 'originalPrice',
      key: 'originalPrice',
      sorter: (a, b) => a.originalPrice - b.originalPrice,
    },
    {
      title: '할인가',
      dataIndex: 'salePrice',
      key: 'salePrice',
      sorter: (a, b) => a.salePrice - b.salePrice,
    },
    {
      title: '리뷰수',
      dataIndex: 'reviewCount',
      key: 'reviewCount',
      sorter: (a, b) => a.reviewCount - b.reviewCount,
    },
    {
      title: '총조회수',
      dataIndex: 'totalViewCount',
      key: 'totalViewCount',
      sorter: (a, b) => a.totalViewCount - b.totalViewCount,
    },
    {
      title: '판매수',
      dataIndex: 'salesCount',
      key: 'salesCount',
      sorter: (a, b) => a.salesCount - b.salesCount,
    },
    {
      title: '색상',
      dataIndex: 'colors',
      key: 'colors',
      sorter: (a, b) => a.colors > b.colors,
    },
    {
      title: '사이즈',
      dataIndex: 'sizes',
      key: 'sizes',
      sorter: (a, b) => a.sizes > b.sizes,
    },
    {
      title: '기타옵션',
      dataIndex: 'options',
      key: 'options',
      sorter: (a, b) => a.options > b.options,
    },
  ];

  const colorList = ['화이트', '그레이', '블랙'];
  let colorListString = '';
  colorListString += colorList.map(item => item);

  const sizeList = ['XS', 'S', 'M', 'L', 'XL'];
  let sizeListString = '';
  sizeListString += sizeList.map(item => item);

  const dataSource = [];
  for (let i = 1; i < 92; ++i) {
    dataSource.push({
      key: i,
      id: 'id',
      itemMinorType: '맨투맨',
      name: '기모 짱짱 맨투맨 (그레이)' + i,
      subscribeDiscountRate: 5 % i,
      subscribeDiscountPeriod: `2020/01/10-2020/02/0${i % 9 + 1}`,
      originalPrice: 39000 + i,
      salePrice: 19900 - i,
      reviewCount: i,
      totalViewCount: 200 - i,
      salesCount: 92 - i,
      colors: colorListString,
      sizes: sizeListString,
      options: '',
    });
  }

  let influencerData = [
    {
      key: 1,
      name: '박효진박효진',
      subscriberNumber: '12만',
    },
    {
      key: 2,
      name: '최수민최수민',
      subscriberNumber: '33만',
    },
    {
      key: 3,
      name: '깡깡깡스스스',
      subscriberNumber: '19만',
    },
  ];
  for (let i = 1; i < 92; ++i) {
    dataSource.push({
      key: i,
      id: 'id',
      itemMinorType: '맨투맨',
      name: '기모 짱짱 맨투맨 (그레이)' + i,
      subscribeDiscountRate: 5 % i,
      subscribeDiscountPeriod: `2020/01/10-2020/02/0${i % 9 + 1}`,
      originalPrice: 39000 + i,
      salePrice: 19900 - i,
      reviewCount: i,
      totalViewCount: 200 - i,
      salesCount: 92 - i,
      colors: colorListString,
      sizes: sizeListString,
      options: '',
    });
  }

  const expandedRowRender = record => {

    const influencerSaleData = [];
    for (let i = 1; i < 5; ++i) {
      influencerSaleData.push({
        key: i,
        name: `스타일리스트${i}`,
        subscribeDiscountRate: 5 % i,
        subscribeDiscountPeriod: `2020/01/10-2020/02/0${i % 9 + 1}`,
      });
    }

    return(
    <ExpandedRowWrapper>
      <Space/>
        <Row>
            <Text style={{color: "black"}}>구독 할인</Text>
            <Space direction="ROW" level={4}/>
            <Input size="small" value={record.subscribeDiscountRate} style={{width: "40px"}} />
            <Space direction="ROW"/>
            <span> %</span>
            <Space direction="ROW" level={2}/>
            <RangePicker
              name="choicedSelectValue"
              size="small"
              style={{width: "250px"}}
              value={[
                moment(record.subscribeDiscountPeriod.substring(0, 10)),
                moment(record.subscribeDiscountPeriod.substring(11, 21)),
              ]}
            />
            <Space direction="ROW" level={2}/>
            <Button size="small">변경</Button>
            <Space direction="ROW"/>
            <Button size="small" style={{color: Colors.Primary}}>초기화</Button>
        </Row>
        <Space level={2}/>
        <Text style={{color: "black"}}>인플루언서 할인</Text>
        <Space level={1}/>
        {influencerSaleData.map((item, index) => (
        <>
            <Row>
                    <Text>{index + 1}</Text>
                    <Space direction="ROW" level={2}/>
                    <Text>{item.name}</Text>
                    <Space direction="ROW" level={2}/>
                    <Input size="small" value={item.subscribeDiscountRate} style={{width: "40px"}} />
                    <Space direction="ROW"/>
                    <span> %</span>
                    <Space direction="ROW" level={2}/>
                    <RangePicker
                      name="choicedSelectValue"
                      size="small"
                      style={{width: "250px"}}
                      value={[
                        moment(item.subscribeDiscountPeriod.substring(0, 10)),
                        moment(item.subscribeDiscountPeriod.substring(11, 21)),
                      ]}
                    />
                    <Space direction="ROW" level={2}/>
                    <Button size="small">변경</Button>
                    <Space direction="ROW"/>
                    <Button size="small" style={{color: "#f33"}}>삭제</Button>
            </Row>
            <Space/>
        </>
        ))}
        <Space/>
        <Button type="primary" onClick={modalOpen} size="small" block>
            추가
        </Button>
        <Modal
            visible={isModalOpen}
            title="인플루언서 찾기"
            onOk={handleSubmit}
            onCancel={modalClose}
            footer={[
              <Button key="back" onClick={modalClose}>
                닫기
              </Button>,
              <Button key="submit" type="primary" loading={isLoading} onClick={handleSubmit}>
                다음
              </Button>,
            ]}
          >
          <Search placeholder="이름으로 검색" onSearch={value => {
            influencerData = influencerData.filter(data => (data.name.includes(value)));
            }} enterButton />
          <Space level={2}/>
          <SearchResultWrapper>
          {influencerData.map((item, index) => (
            <>
                <Button block>
                  <Row>
                        <Text>{index + 1}</Text>
                        <Space direction="ROW" level={12}/>
                        <Text style={{color: "black"}}>{item.name}</Text>
                        <Space direction="ROW" level={2}/>
                        <Text>구독자 수 : {item.subscriberNumber}명</Text>
                        <Space direction="ROW" level={2}/>
                    </Row>
                </Button>
                <Space level={1}/>
            </>
            ))}
            </SearchResultWrapper>
          </Modal>

    </ExpandedRowWrapper>
    ); };

  const actions = [
    {
      icon: 'delete',
      text: '선택삭제',
      onClick: num => {
        return;
      },
    },
    {
      text: '특정 피커 구독 할인 설정',
      onClick: num => {
        return;
      },
    },
    {
      text: '선택 상품 구독 할인 설정',
      onClick: num => {
        return;
      },
    },
  ];

  const inputs: BoardFilterProps['inputs'] = [
    {
      name: 'period',
      defaultValue: {
        type: 'all',
        startDate: moment().subtract(1, 'months').format('YYYY-MM-DD'),
        endDate: moment().format('YYYY-MM-DD'),
      },
      labelText: '조회기간',
      guideText: '조회기간 부가 설명입니다',
      select: [{name: '전체', value: 'all'},
      {name: '상품등록일', value: 'registerProductDate'},
      {name: '판매시작일', value: 'startSellingDate'},
      {name: '판매종료일', value: 'endSellingDate'}],
      Component: Datepicker,
    },
    {
      name: 'detailedCondition',
      defaultValue: {
        type: 'all',
        query: '',
      },
      labelText: '상세조건',
      guideText: '상세조건 부가 설명입니다',
      select: [{name: '전체', value: 'all'},
        {name: '수취인명', value: 'receiverName'},
        {name: '구매자명', value: 'buyerName'},
        {name: '구매자연락처', value: 'buyerPhoneNum'},
        {name: '구매자ID', value: 'buyerID'},
        {name: '주문번호', value: 'orderNum'},
        {name: '상품주문번호', value: 'productOrderNum'},
        {name: '상품번호', value: 'productNum'},
        {name: '송장번호', value: 'invoiceNum'}],
      Component: SelectInput,
    },
    {
      name: 'orderState',
      defaultValue: {
        type: 'all',
        query: '',
      },
      labelText: '주문상태',
      guideText: '주문상태 부가 설명입니다',
      select: [{name: '전체', value: 'all'},
        {name: '신규주문', value: 'newOrder'},
        {name: '발주확인', value: 'confirmedOrder'},
        {name: '발주확인해제', value: 'cancelConfirmedOrder'},
        {name: '배송중', value: 'shippingOrder'},
        {name: '배송완료', value: 'shippedOrder'},
      ],
      Component: Selector,
    },
    {
      name: 'productName',
      defaultValue: {
        query: '',
      },
      labelText: '상품명',
      Component: InputBox,
    },
    {
      name: 'sellingState',
      defaultValue: {
        choices: ['판매대기', '판매중', '품절', '승인대기', '판매중지', '판매종료', '판매금지'],
      },
      labelText: '판매상태',
      guideText: '판매상태 부가 설명입니다',
      options: [{name: '판매대기', value: 'waitSelling'},
        {name: '판매중', value: 'nowSelling'},
        {name: '품절', value: 'soldOut'},
        {name: '승인대기', value: 'waitConfirm'},
        {name: '판매중지', value: 'stopSelling'},
        {name: '판매종료', value: 'endSelling'},
        {name: '판매금지', value: 'banSelling'},
      ],
      Component: MultiChecker,
    },
    {
      name: 'category',
      defaultValue: {
        major: 'all',
        minor: 'all',
        final: 'all',
      },
      labelText: '카테고리',
      Component: ItemCategorySelector,
    },
  ];
  return (
    <MainLayout>
      <Board
        title="상품 조회/수정"
        subTitle="등록한 상품을 조회/수정할 수 있는 메뉴입니다."
        helpTexts={[
          `기본적으로 "최근 3개월 이내 신규등록","판매중"의 상품을 우선 노출 해 주고 있으며  판매대기/품절 등 모든 상품을 조회하시려면 "판매상태"를 전체로 체크하여 조회하시면 됩니다.`,
          '상단에 판매상태별 상품 건수 확인이 가능하며, 건수를 클릭 시 상품목록에 등록한 상품이 조회됩니다.',
          `특정 상품의 조회를 원하신다면, "검색어" 기능을 사용해서 상품번호/상품명/제조사명 등 원하시는 유형으로 조회하실 수 있습니다.`,
        ]}
        {...{columns, dataSource, expandedRowRender, actions}}
        filter={{title: '상세 조회하기', guideText: '', inputs}}
      />
    </MainLayout>
  );
}

const ExpandedRowWrapper = styled.div`
    display:flex;
    flex-direction:column;
    width: 800px;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const SearchResultWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items:center;
`;
