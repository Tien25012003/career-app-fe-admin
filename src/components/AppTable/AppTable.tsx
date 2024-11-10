import { useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { PaginationConfigsProps } from 'hooks/useFilter';
import { DataTable, DataTableColumn, DataTableRowClickHandler } from 'mantine-datatable';
import { useState } from 'react';

type TAppTable<T> = {
  data: T[];
  columns: DataTableColumn<T>[];
  isLoading?: boolean;
  onRowClick?: DataTableRowClickHandler<T>;
  paginationConfigs?: PaginationConfigsProps;
};
const PAGE_SIZES = [10];
function AppTable<T>({ data, columns, isLoading, onRowClick, paginationConfigs }: TAppTable<T>) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const { totalCounts, page, size, onChange } = paginationConfigs || {};

  // useEffect(() => {
  //   setPage(1);
  // }, [pageSize]);

  // const [page, setPage] = useState(1);
  //const [records, setRecords] = useState(data.slice(0, pageSize));

  // useEffect(() => {
  //   const from = (page - 1) * pageSize;
  //   const to = from + pageSize;
  //   setRecords(data.slice(from, to));
  // }, [page, pageSize, data]);

  const [selectedRecords, setSelectedRecords] = useState([]);
  return (
    <DataTable
      columns={columns}
      records={data}
      withRowBorders
      withTableBorder
      withColumnBorders
      borderRadius={'md'}
      striped
      //minHeight={500}
      height={500}
      noRecordsText='Không có dữ liệu'
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

      // PAGINATION
      // paginationActiveBackgroundColor='grape'
      recordsPerPage={size || 1}
      page={page || 1}
      onPageChange={(p) => onChange?.(p, size)}
      recordsPerPageOptions={PAGE_SIZES}
      totalRecords={totalCounts}
      onRecordsPerPageChange={() => {}}
    />
  );
}

export default AppTable;
