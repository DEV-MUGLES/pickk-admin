import {useState} from 'react';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import {PageHeader} from 'antd';
import {palette} from '@pickk/design-token';

import {BoardFilter, BoardTable} from '@components/new-common/organisms';

import {removeDashFromNumber} from '@common/helpers';

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

  const formatFilter = (
    inputs: Record<string, unknown>,
  ): Record<string, unknown> => {
    let result = {};

    /**  조회 기간 필터를 형식에 맞게 변경한다. */
    const datePeriodFilter = inputs.period;
    result = {
      ...inputs,
      ...(datePeriodFilter
        ? {[datePeriodFilter['lookup']]: datePeriodFilter['range']}
        : {}),
    };
    delete result['period'];

    /**  검색어가 숫자와 '-'의 조합인 경우 '-' 를 제거한다.  */
    result = {
      ...result,
      ...(result['search']
        ? {search: removeDashFromNumber(result['search'])}
        : {}),
      ...(result['query']
        ? {query: removeDashFromNumber(result['query'])}
        : {}),
    };

    return result;
  };

  const handleFilterChange = (newFilter: Record<string, unknown>) => {
    const formattedFilter = formatFilter(newFilter);

    /** query 필드는 filter에서 제외한다. */
    setQuery(formattedFilter.query ?? null);
    delete formattedFilter.query;

    setFilter(formattedFilter);
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
