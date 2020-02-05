import React, {useState} from 'react';
import {Modal} from 'antd';

import Phase0 from './Phase0';
import Phase1 from './Phase1';

export default function InfluencerDiscountSetModal({
  isModalOpen,
  setIsModalOpen,
}) {
  const [phase, setPhase] = useState(0);
  const [selectedInfluencerData, setSelectedInfluencerData] = useState(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setPhase(0);
  };

  // tslint:disable-next-line: no-any
  const handleDiscountDataChange = (data: any) => {
    setSelectedInfluencerData({
      ...selectedInfluencerData,
      ...data,
    });
  };

  const influencerData = [
    {
      avatar: 'https://i.ytimg.com/vi/ex3EjW-kR5Q/maxresdefault.jpg',
      name: '깡스스스스타일리스트',
      subscriberNumber: '38만',
    },
    {
      avatar: 'https://i.ytimg.com/vi/ex3EjW-kR5Q/maxresdefault.jpg',
      name: '진진호',
      subscriberNumber: '5만',
    },
    {
      avatar: 'https://i.ytimg.com/vi/ex3EjW-kR5Q/maxresdefault.jpg',
      name: '까마귀효진',
      subscriberNumber: '3123',
    },
    {
      avatar: 'https://i.ytimg.com/vi/ex3EjW-kR5Q/maxresdefault.jpg',
      name: '티벳수민',
      subscriberNumber: '223',
    },
    {
      avatar: 'https://i.ytimg.com/vi/ex3EjW-kR5Q/maxresdefault.jpg',
      name: '깡스타일리스트',
      subscriberNumber: '38만',
    },
    {
      avatar: 'https://i.ytimg.com/vi/ex3EjW-kR5Q/maxresdefault.jpg',
      name: '진진호',
      subscriberNumber: '5만',
    },
    {
      avatar: 'https://i.ytimg.com/vi/ex3EjW-kR5Q/maxresdefault.jpg',
      name: '까마귀효진',
      subscriberNumber: '3123',
    },
    {
      avatar: 'https://i.ytimg.com/vi/ex3EjW-kR5Q/maxresdefault.jpg',
      name: '티벳수민',
      subscriberNumber: '223',
    },
    {
      avatar: 'https://i.ytimg.com/vi/ex3EjW-kR5Q/maxresdefault.jpg',
      name: '깡스타일리스트',
      subscriberNumber: '38만',
    },
    {
      avatar: 'https://i.ytimg.com/vi/ex3EjW-kR5Q/maxresdefault.jpg',
      name: '진진호',
      subscriberNumber: '5만',
    },
    {
      avatar: 'https://i.ytimg.com/vi/ex3EjW-kR5Q/maxresdefault.jpg',
      name: '까마귀효진',
      subscriberNumber: '3123',
    },
    {
      avatar: 'https://i.ytimg.com/vi/ex3EjW-kR5Q/maxresdefault.jpg',
      name: '티벳수민',
      subscriberNumber: '223',
    },
  ];

  return (
    <Modal
      visible={isModalOpen}
      width={400}
      title={phase === 0 ? '인플루언서 찾기' : '할인율 설정하기'}
      onCancel={closeModal}
      footer={null}>
      {phase === 0 && (
        <Phase0
          {...{
            setPhase,
            influencerData,
            setSelectedInfluencerData,
          }}
        />
      )}
      {phase === 1 && (
        <Phase1
          {...{
            setPhase,
            selectedInfluencerData,
            handleDiscountDataChange,
            closeModal,
          }}
        />
      )}
    </Modal>
  );
}
