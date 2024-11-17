import { BarChart } from '@mantine/charts';
import { Box, Group, Paper, Text, useMantineTheme } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendarMonth } from '@tabler/icons-react';
const dummyData = [
  { month: 'January', users: 1200, teachers: 900, students: 200 },
  { month: 'February', users: 1900, teachers: 1200, students: 400 },
  { month: 'March', users: 400, teachers: 1000, students: 200 },
  { month: 'April', users: 1000, teachers: 200, students: 800 },
  { month: 'May', users: 800, teachers: 1400, students: 1200 },
  { month: 'June', users: 750, teachers: 600, students: 1000 },
  { month: 'July', users: 1250, teachers: 800, students: 900 },
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
          { name: 'users', color: theme.colors.cyan[5], label: 'Người dùng' },
          { name: 'teachers', color: theme.colors.red[5], label: 'Giáo viên' },
          { name: 'students', color: theme.colors.yellow[5], label: 'Học sinh' },
        ]}
      />
    </Paper>
  );
}
