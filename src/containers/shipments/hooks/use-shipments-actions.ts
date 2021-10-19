import {message} from 'antd';

import {TableActionType} from '@components/new-common/organisms/board-table/actions';
import {useToggleModals} from '@common/hooks';
import {useUpdateOrderItemTrackCode} from '@components/shipments';

import {FlattenShipmentDataType} from './use-shipments';

export const useShipmentsActions = ({
  selectedMerchantUids,
  selectedRecords,
  initSelection,
  reload = () => null,
}: {
  selectedMerchantUids: string[];
  selectedRecords: FlattenShipmentDataType[];
  initSelection: () => void;
  reload: () => void;
}) => {
  const {isModalOpen, openModal, closeModal} = useToggleModals([
    'trackCodeUpdate',
  ]);

  const {updateOrderItemTrackCode} = useUpdateOrderItemTrackCode();

  const shipmentActions: TableActionType[] = [
    {
      text: '송장수정',
      onClick: async () => {
        if (selectedMerchantUids.length !== 1) {
          message.warning(
            '일괄 수정은 지원하지 않습니다.\n1개의 주문건만 선택해주세요.',
          );
          return;
        }

        if (!selectedRecords?.[0]?.shipment) {
          message.warning(
            '배송정보가 존재하지 않는 송장은 수정할 수 없습니다.',
          );
          return;
        }

        openModal('trackCodeUpdate');
      },
    },
  ];

  const handleTrackCodeUpdateModalSubmit = async (
    merchantUid: string,
    parsedTrackCode: string,
  ) => {
    try {
      await updateOrderItemTrackCode(merchantUid, parsedTrackCode);

      message.success('송장정보를 수정했습니다.');
      closeModal('trackCodeUpdate');
      reload();
      initSelection();
    } catch (err) {
      message.error('실패했습니다. err - ' + err);
    }
  };

  return {
    shipmentActions,
    isTrackCodeUpdateModalOpen: isModalOpen.trackCodeUpdate,
    closeTrackCodeUpdateModal: () => closeModal('trackCodeUpdate'),
    handleTrackCodeUpdateModalSubmit,
  };
};
