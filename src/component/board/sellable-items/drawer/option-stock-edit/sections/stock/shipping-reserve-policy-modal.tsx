import {Alert, Modal, Typography} from 'antd';

const {Text} = Typography;

const ALERT_MESSAGE = (
  <>
    <Text>
      (1) 예약발송 재고가 아닌 일반 재고가 0이 되는 순간부터 예약발송이
      적용되오니, 예약발송 설정희망 시, 일반 재고를 0으로 설정부탁드립니다.
      <br />
      (2) 예약발송일이 되면, 예약발송 상태는 자동으로 종료되며, 잔여 예약발송
      재고는 일반 재고에 합산됩니다.
    </Text>
  </>
);

export type ShippingReservePolicyModalProps = {
  visible: boolean;
  onClose: () => void;
};

function ShippingReservePolicyModal({
  visible,
  onClose,
}: ShippingReservePolicyModalProps) {
  return (
    <Modal title="예약 발송" visible={visible} onCancel={onClose} width={'60%'}>
      <Alert
        message="예약발송 안내"
        description={ALERT_MESSAGE}
        showIcon
        style={{marginBottom: '0.8rem'}}
      />
      <Text>준비중...</Text>
    </Modal>
  );
}

export default ShippingReservePolicyModal;
