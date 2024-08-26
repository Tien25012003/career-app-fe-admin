import React, { useEffect, useState } from 'react';
import { DataTable, DataTableColumn, DataTableRowClickHandler } from 'mantine-datatable';
import { useMantineColorScheme, useMantineTheme } from '@mantine/core';

type TAppTable<T> = {
  data: T[];
  columns: DataTableColumn<T>[];
  isLoading?: boolean;
  onRowClick?: DataTableRowClickHandler<T>;
};
const PAGE_SIZES = [10, 15, 20];
function AppTable<T>({ data, columns, isLoading, onRowClick }: TAppTable<T>) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(data.slice(0, pageSize));

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(data.slice(from, to));
  }, [page, pageSize, data]);

  const [selectedRecords, setSelectedRecords] = useState([]);
  return (
    <DataTable
      columns={columns}
      records={records}
      withRowBorders
      withTableBorder
      withColumnBorders
      borderRadius={'md'}
      striped
      //minHeight={500}
      height={500}
      noRecordsText='Không có dữ liệu'
      totalRecords={data.length}
      paginationActiveBackgroundColor='grape'
      recordsPerPage={pageSize}
      page={page}
      onPageChange={(p) => setPage(p)}
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
      fetching={isLoading}
      onRowClick={onRowClick}
      highlightOnHover
      verticalSpacing='md'
      styles={{
        header: {
          backgroundColor: colorScheme === 'light' ? theme.white : theme.colors.gray[9],
          zIndex: 9,
          padding: '10px 20px',
        },
        table: {
          backgroundColor: colorScheme === 'light' ? theme.white : theme.colors.gray[9],
        },
      }}
      scrollAreaProps={{ type: 'never' }}
      recordsPerPageLabel='Số items mỗi trang'
      // selectedRecords={selectedRecords}
      // onSelectedRecordsChange={setSelectedRecords}
    />
  );
}

export default AppTable;
