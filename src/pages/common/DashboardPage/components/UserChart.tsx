import { BarChart } from '@mantine/charts';
import { Paper, useMantineTheme, Text, Group, Box } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendarMonth } from '@tabler/icons-react';
const dummyData = [
  { month: 'January', Users: 1200, Teachers: 900, Students: 200 },
  { month: 'February', Users: 1900, Teachers: 1200, Students: 400 },
  { month: 'March', Users: 400, Teachers: 1000, Students: 200 },
  { month: 'April', Users: 1000, Teachers: 200, Students: 800 },
  { month: 'May', Users: 800, Teachers: 1400, Students: 1200 },
  { month: 'June', Users: 750, Teachers: 600, Students: 1000 },
  { month: 'July', Users: 1250, Teachers: 800, Students: 900 },
];
export function UserChart() {
  const theme = useMantineTheme();
  return (
    <Paper withBorder shadow='sm' p='sm' radius='md'>
      <Group justify='space-between' align='center' mb='md' ml='sm'>
        <Text size='lg' fw={500}>
          Thống kê người dùng
        </Text>
        <Box>
          <DatePickerInput
            w={'14.75rem'}
            placeholder='Chọn ngày thống kê'
            leftSection={<IconCalendarMonth size='1rem' />}
            locale='vi'
            valueFormat='DD/MM/YYYY'
          />
        </Box>
      </Group>
      <BarChart
        h={300}
        data={dummyData}
        dataKey='month'
        withLegend
        withBarValueLabel
        series={[
          { name: 'Users', color: theme.colors.cyan[5], label: 'Người dùng' },
          { name: 'Teachers', color: theme.colors.red[5], label: 'Giáo viên' },
          { name: 'Students', color: theme.colors.yellow[5], label: 'Học sinh' },
        ]}
      />
    </Paper>
  );
}
