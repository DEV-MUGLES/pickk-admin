import BoardStoreProvider from '@src/common/contexts/Board';
import {InquiriesFilter, InquiriesTable} from '@src/components/inquiries';

import {useInquiries} from './hooks';

type InquiriesBoardContainerProps = {
  title: string;
  subTitle: string;
};

export default function InquiriesBoardContainer(
  props: InquiriesBoardContainerProps,
) {
  return (
    <BoardStoreProvider
      dataFetchConfig={{
        useBoardData: useInquiries,
        operationName: 'meSellerInquiries',
        filterName: 'filter',
      }}>
      <InquiriesFilter {...props} />
      <InquiriesTable {...props} />
    </BoardStoreProvider>
  );
}
