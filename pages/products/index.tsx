import React from 'react';
import MainLayout from '@src/components/templates/MainLayout';
import Board from '@src/components/templates/Board';

import {BoardFilterProps} from '@src/components/organisms/Board/Filter';
import Datepicker from '@src/components/molecules/BoardFilter/input/DatePicker';
import SelectInput from '@src/components/molecules/BoardFilter/input/SelectInput';
import Select from '@src/components/molecules/BoardFilter/input/Selector';
import InputBox from '@src/components/molecules/BoardFilter/input/InputBox';
import MultiChecker from '@src/components/molecules/BoardFilter/input/MultiChecker';
import moment from 'moment';

export default function Products() {
  const columns = [
    {
      width: 150,
      title: '카테고리',
      dataIndex: 'category',
      key: 'category',
      sorter: (a, b) => a.category > b.category,
    },
    {
      title: '상품명',
      dataIndex: 'itemName',
      key: 'itemName',
      render: text => <a>{text}</a>,
      sorter: (a, b) => a.itemName > b.itemName,
    },
    {
      width: 100,
      title: '정가',
      dataIndex: 'originalPrice',
      key: 'originalPrice',
      sorter: (a, b) => a.originalPrice - b.originalPrice,
    },
    {
      width: 100,
      title: '할인가',
      dataIndex: 'salePrice',
      key: 'salePrice',
      sorter: (a, b) => a.salePrice - b.salePrice,
    },
    {
      width: 100,
      title: '구독 할인',
      dataIndex: 'subscriptionDiscount',
      key: 'subscriptionDiscount',
      render: (num: number) => <span>{num}%</span>,
      sorter: (a, b) => a.subscriptionDiscount - b.subscriptionDiscount,
    },
  ];
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
      Component: Select,
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
        {...{columns, actions}}
        filter={{title: '상세 조회하기', guideText: '', inputs}}
      />
    </MainLayout>
  );
}
