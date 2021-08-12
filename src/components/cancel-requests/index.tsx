import Header from '@src/components/common/organisms/Board/Header';
import Preview from '@src/components/common/organisms/Board/preview';
import Filter from '@src/components/common/organisms/Board/Filter';
import Table from '@src/components/common/organisms/Board/Table';

import {canceldRequestPreviewData} from './preview-data';
import {BoardProps} from '../props';

import {useCancelRequestPreview} from '@src/common/hooks/ClaimRequest';

import {orderItemInputs} from '../order-items/inputs';
import {orderItemColumns} from '../order-items/table';

function CancelRequestsBoard(props: BoardProps) {
  return (
    <>
      <Header {...props} />
      <Preview
        data={canceldRequestPreviewData}
        usePreviewData={useCancelRequestPreview}
      />
      <Filter {...props} inputs={orderItemInputs} />
      <Table {...props} columns={orderItemColumns} />
    </>
  );
}

export default CancelRequestsBoard;
