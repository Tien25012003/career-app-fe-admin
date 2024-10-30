// import { SecondPaginationConfigsProps } from '@/components/core/second-pagination/SecondPagination';
import { omitFalsy } from '@helper/omitFalsy.helpers';

import qs from 'query-string';
import { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const RECORDS_PER_PAGE = 10;

export type QueriesParams = {
  page: number;
  size: number;
};

export type PaginationConfigsProps = {
  size?: number; // ? / page
  totalPages: number; // total pages
  totalCounts: number; // total counts
  page: number; // currentPage
  onChange?: (page?: number, size?: number) => void;
};

export const useFilter = <T>(initialQuery?: Omit<T, 'page' | 'size'>) => {
  // HOOKS
  const location = useLocation();
  const navigate = useNavigate();

  // CONST
  const initQueries = useMemo(() => {
    const parsedQuery = qs.parse(location.search, {
      parseNumbers: true,
      parseBooleans: true,
    });
    return {
      ...initialQuery,
      ...parsedQuery,
    } as QueriesParams & T;
  }, [initialQuery, location.search]);

  // METHODS

  // Handle Search
  const onSearch = (value: Partial<T>) => {
    navigate(
      {
        search: qs.stringify(
          omitFalsy({
            ...initQueries,
            ...(value as Partial<T>),
            page: 1,
          }),
        ),
      },
      { replace: true },
    );
  };

  // Handle Reset
  const onReset = () => {
    navigate(
      {
        search: qs.stringify({
          ...initialQuery,
          page: initQueries.page,
          size: initQueries.size,
        }),
      },
      { replace: true },
    );
  };

  // Handle Pagination
  const getPaginationConfigs = (totalPages?: number, totalCounts?: number) => {
    return {
      totalPages: totalPages || 0,
      totalCounts: totalCounts || 0,
      page: initQueries.page,
      size: initQueries.size,
      onChange: (page: number, size: number) => {
        navigate(
          {
            search: qs.stringify({
              ...initQueries,
              page: page || 1,
              size: size || RECORDS_PER_PAGE,
            }),
          },
          { replace: true },
        );
      },
    } as PaginationConfigsProps;
  };

  // Ensure page and size are set in query string
  useEffect(() => {
    const newQuery = initQueries;
    if (!newQuery.page) {
      newQuery.page = 1;
    }
    if (!newQuery.size) {
      newQuery.size = RECORDS_PER_PAGE;
    }
    navigate(
      {
        search: qs.stringify(newQuery),
      },
      { replace: true },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initQueries]);

  return {
    queries: initQueries,
    hasNone: !Object.keys(initQueries).length,
    onSearch,
    onReset,
    getPaginationConfigs,
  };
};
