import AppSearch from '@component/AppSearch/AppSearch';
import AppTable from '@component/AppTable/AppTable';
import { Stack, Text } from '@mantine/core';
import { conclusionDummyData } from '../../dummyData';

export function Conclusion() {
  return (
    <Stack>
      <AppSearch />
      <AppTable
        data={conclusionDummyData}
        columns={[
          {
            accessor: 'Type',
            title: 'Thứ tự',
            width: 50,
            textAlign: 'center',
          },
          {
            accessor: 'Holland',
            title: 'Holland',
            width: 50,
            textAlign: 'center',
          },
          {
            accessor: 'IQ',
            title: 'IQ',
            width: 50,
            textAlign: 'center',
          },
          {
            accessor: 'EQ',
            title: 'EQ',
            width: 50,
            textAlign: 'center',
          },
          {
            accessor: 'SchoolScore',
            title: 'Khối',
            width: 50,
            textAlign: 'center',
          },
          {
            accessor: 'Field',
            title: 'Lĩnh vực',
            width: 100,
          },
          {
            accessor: 'Jobs',
            title: 'Ngành nghề phù hợp',
            width: 300,
            render: (val) => <div style={{ whiteSpace: 'pre-wrap' }}>{val.Jobs}</div>,
          },
          {
            accessor: 'Conclusion',
            title: 'Kết luận chung',
            width: 300,
          },
        ]}
      />
    </Stack>
  );
}
