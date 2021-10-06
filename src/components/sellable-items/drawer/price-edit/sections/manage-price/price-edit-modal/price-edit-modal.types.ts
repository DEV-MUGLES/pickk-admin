export type PriceEditModalType = 'add' | 'edit';
export type PriceEditModalProps = {
  type: PriceEditModalType;
  visible: boolean;
  onClose: () => void;
  selectedPriceId: number;
};
