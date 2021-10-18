import {useState} from 'react';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import {PageHeader} from 'antd';
import {palette} from '@pickk/design-token';

import {BoardFilter, BoardTable} from '@components/new-common/organisms';

import {BoardTemplateProps} from './board.type';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 100vh;
  padding: 0.8rem;

  background-color: ${palette.gray1};
`;

const StyledPageHeader = styled(PageHeader)`
  margin-bottom: 0.8rem;

  background-color: ${palette.white};
`;

const DEFAULT_PAGE_SIZE = 20;

export default function BoardTemplate(props: BoardTemplateProps) {
  const propsWithDefault: BoardTemplateProps = {
    ...props,
    defaultPageSize: DEFAULT_PAGE_SIZE,
  };

  const {
    title,
    subTitle,
    useBoardData,
    defaultFilter,
    filterInputs,
    defaultPageSize,
    onRowClick = () => null,
  } = propsWithDefault;

  const router = useRouter();

  const [filter, setFilter] = useState<Record<string, unknown>>(defaultFilter);
  const [query, setQuery] = useState(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const {
    data = [],
    total,
    loading,
    refetch,
  } = useBoardData({
    pageInput: {
      offset: (page - 1) * pageSize,
      limit: pageSize,
    },
    filter,
    ...(query ? {query} : {}),
  });

  const handleFilterChange = (newFilter: Record<string, unknown>) => {
    /** query 필드는 filter에서 제외한다. */
    setQuery(newFilter.query ?? null);
    delete newFilter.query;

    setFilter(newFilter);
  };

  if (!data && !loading) {
    return null;
  }

  return (
    <StyledWrapper>
      <StyledPageHeader
        title={title}
        subTitle={subTitle}
        onBack={router.back}
      />
      {!!filterInputs && (
        <BoardFilter
          defaultFilter={filter}
          onFilterChange={handleFilterChange}
          inputs={filterInputs}
        />
      )}
      <BoardTable
        {...propsWithDefault}
        dataSource={data}
        totalDataSize={total}
        loading={loading}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        onRefreshClick={refetch}
        onRowClick={onRowClick}
      />
    </StyledWrapper>
  );
}