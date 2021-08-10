import MainLayout from '@src/components/common/templates/MainLayout';
import SellableItemsBoard from '@src/component/board/sellable-items';

function SellableItems() {
  return (
    <MainLayout>
      <SellableItemsBoard
        title="활성상품 관리"
        subTitle="판매 가능한 상품을 관리할 수 있는 메뉴입니다."
      />
    </MainLayout>
  );
}

export default SellableItems;
