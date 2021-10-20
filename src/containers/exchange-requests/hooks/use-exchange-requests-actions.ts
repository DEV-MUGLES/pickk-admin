import {message} from 'antd';
import {ExchangeRequestStatus} from '@pickk/common';

import {TableActionType} from '@components/common/organisms/board-table/actions';
import {useToggleModals} from '@common/hooks';
import {
  useBulkPickExchangeRequests,
  useReshipExchangeRequest,
} from '@components/exchange-requests';

import {FlattenExchangeRequestDataType} from './use-exchange-requests';

export const useExchangeRequestsActions = ({
  selectedMerchantUids,
  selectedRecords,
  initSelection,
  reload = () => null,
}: {
  selectedMerchantUids: string[];
  selectedRecords: FlattenExchangeRequestDataType[];
  initSelection: () => void;
  reload: () => void;
}) => {
  const {isModalOpen, openModal, closeModal} = useToggleModals(['ship']);

  const {bulkPickExchangeRequests} = useBulkPickExchangeRequests();
  const {reshipExchangeRequest} = useReshipExchangeRequest();

  const exchangeRequestsActions: TableActionType[] = [
    {
      text: '수거완료',
      onClick: async () => {
        if (
          !selectedRecords.every(
            ({status}) => status === ExchangeRequestStatus.Requested,
          )
        ) {
          message.warning(
            '수거중(교환요청 상태)인 요청만 완료처리할 수 있습니다.',
          );
          return;
        }

        try {
          await bulkPickExchangeRequests(selectedMerchantUids);

          message.success('수거 완료되었습니다.');
          initSelection();
          reload();
        } catch (error) {
          message.error(`실패했습니다. - ${error}`);
        }
      },
    },
    {
      text: '교환품재발송',
      onClick: async () => {
        if (selectedMerchantUids.length !== 1) {
          message.warning(
            '일괄 재발송처리는 지원하지 않습니다.\n1개의 주문건만 선택해주세요.',
          );
          return;
        }

        if (selectedRecords[0]?.status !== ExchangeRequestStatus.Picked) {
          message.warning('수거완료 상태만 재발송 할 수 있습니다.');
          return;
        }

        openModal('ship');
      },
    },
  ];

  const handleShipModalSubmit = async (shipment) => {
    try {
      await reshipExchangeRequest(
        shipment.merchantUid,
        shipment.courierId,
        shipment.trackCode,
      );

      message.success('적용되었습니다.');
      initSelection();
      reload();
    } catch (error) {
      message.error(`실패했습니다. - ${error}`);
    }
  };

  return {
    exchangeRequestsActions,
    isShipModalOpen: isModalOpen.ship,
    closeShipModal: () => closeModal('ship'),
    handleShipModalSubmit,
  };
};
