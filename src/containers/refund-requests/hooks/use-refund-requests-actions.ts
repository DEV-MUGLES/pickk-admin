import {message} from 'antd';
import {RefundRequestStatus} from '@pickk/common';

import {TableActionType} from '@components/new-common/organisms/board-table/actions';
import {useToggleModals} from '@common/hooks';
import {
  useBulkPickRefundRequests,
  useConfirmRefundRequest,
} from '@components/refund-requests';

import {FlattenRefundRequestDataType} from './use-refund-requests';

export const useRefundRequestsActions = ({
  selectedMerchantUids,
  selectedRecords,
  initSelection,
  reload = () => null,
}: {
  selectedMerchantUids: string[];
  selectedRecords: FlattenRefundRequestDataType[];
  initSelection: () => void;
  reload: () => void;
}) => {
  const {isModalOpen, openModal, closeModal} = useToggleModals([
    'refundConfirm',
  ]);

  const {bulkPickRefundRequests} = useBulkPickRefundRequests();
  const {confirmRefundRequest} = useConfirmRefundRequest();

  const refundRequestsActions: TableActionType[] = [
    {
      text: '수거완료',
      onClick: async () => {
        if (
          !selectedRecords.every(
            ({status}) => status === RefundRequestStatus.Requested,
          )
        ) {
          message.warning(
            '수거중(반품요청상태)인 요청만 완료처리할 수 있습니다.',
          );
          return;
        }

        try {
          await bulkPickRefundRequests(selectedMerchantUids);

          message.success('수거 완료되었습니다.');
          initSelection();
          reload();
        } catch (error) {
          message.error(`실패했습니다. - ${error}`);
        }
      },
    },
    {
      text: '반품완료',
      onClick: async () => {
        if (selectedMerchantUids.length !== 1) {
          message.warning(
            `반품 일괄 처리는 지원하지 않습니다.\n1개의 주문건만 선택해주세요.`,
          );
          return;
        }

        if (
          !selectedRecords.every(
            ({status}) => status === RefundRequestStatus.Picked,
          )
        ) {
          message.warning('수거 완료된 요청만 반품 완료처리할 수 있습니다.');
          return;
        }

        openModal('refundConfirm');
      },
    },
  ];

  const handleRefundConfirmModalSubmit = async (
    merchantUid: string,
    shippingFee: number,
  ) => {
    try {
      await confirmRefundRequest(merchantUid, shippingFee);

      message.success('반품이 완료되었습니다.');
      closeModal('refundConfirm');
      initSelection();
      reload();
    } catch (err) {
      message.error('실패했습니다. err - ' + err);
    }
  };

  return {
    refundRequestsActions,
    isRefundConfirmModalOpen: isModalOpen.refundConfirm,
    closeRefundConfimModal: () => closeModal('refundConfirm'),
    handleRefundConfirmModalSubmit,
  };
};
