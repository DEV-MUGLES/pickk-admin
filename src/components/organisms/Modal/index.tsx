import React, {useState} from 'react';
import {Modal} from 'antd';

import Phase0 from './Phase0';
import Phase1 from './Phase1';

export default function InfluencerDiscountSetModal({
  itemPk,
  isModalOpen,
  setIsModalOpen,
  onComplete,
}) {
  const [phase, setPhase] = useState(0);
  const [selectedInfluencerData, setSelectedInfluencerData] = useState(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setPhase(0);
    onComplete();
  };

  // tslint:disable-next-line: no-any
  const handleDiscountDataChange = (data: any) => {
    setSelectedInfluencerData({
      ...selectedInfluencerData,
      ...data,
    });
  };

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
            setSelectedInfluencerData,
          }}
        />
      )}
      {phase === 1 && (
        <Phase1
          {...{
            itemPk,
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
