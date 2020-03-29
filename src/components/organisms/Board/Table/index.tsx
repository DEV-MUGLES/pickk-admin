import {useState} from 'react';
import styled from 'styled-components';
import {Table, Divider} from 'antd';

import Header from './Header';
import Footer, {TableFooterProps} from './Footer';
import ActionBar, {TableActionBarProps} from './ActionBar';
import Colors from '@src/components/atoms/colors';

import {useBoardContext} from '@src/contexts/Board';
import SubsDiscountRateModal from '@src/board/item/table/modal/subs-discount-rate';

export type BoardTableProps = {
  // tslint:disable-next-line: no-any
  title: string;
  columns: any;
} & Pick<TableActionBarProps, 'actions'> &
  Pick<TableFooterProps, 'footActions'>;

export default function BoardTable({
  title,
  columns,
  actions,
  footActions,
}: BoardTableProps) {
  const {state} = useBoardContext();
  const {tableData, loading} = state;

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [discountModal, setDiscountModal] = useState(false);

  const rowSelection = {selectedRowKeys, onChange: setSelectedRowKeys};

  const newItemActions = [
    ...actions,
    {
      text: '구독 할인 설정',
      onClick: (ids: number[]) => {
        setDiscountModal(true);
      },
    },
  ];

  const actionBarProps: TableActionBarProps = {
    ...{selectedRowKeys, actions: newItemActions},
  };
  const footerProps: TableFooterProps = {
    ...{selectedRowKeys, footActions},
  };

  let modalData = [];
  if (tableData)
    modalData = tableData.filter(data => selectedRowKeys.includes(data.id));

  return (
    <Wrapper>
      <DataTable
        {...{columns, dataSource: tableData, rowSelection, loading}}
        scroll={{x: true}}
        size="small"
        title={() => (
          <>
            <Header {...{title, columns, dataSource: tableData}} />
            {actions && (
              <>
                <Divider style={{fontSize: 10}} />
                <ActionBar {...actionBarProps} />
              </>
            )}
          </>
        )}
        footer={footActions ? () => <Footer {...footerProps} /> : null}
        pagination={{position: 'bottom'}}
      />
      {discountModal && (
        <SubsDiscountRateModal
          visible={discountModal}
          onClose={() => {
            setDiscountModal(false);
          }}
          modalData={modalData}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${Colors.White};
  display: flex;
  align-itmes: flex-start;
  text-align: left;
  width: calc(100vw - 250px);
`;

const DataTable = styled(Table)`
  width: 100%;
`;
