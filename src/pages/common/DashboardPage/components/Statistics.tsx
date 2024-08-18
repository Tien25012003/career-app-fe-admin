import {
  Group,
  Paper,
  Box,
  Text,
  Button,
  Card,
  useMantineTheme,
  Stack,
  Grid,
  useMantineColorScheme,
  alpha,
} from '@mantine/core';
import { IconUsers, IconUserEdit, IconSchool } from '@tabler/icons-react';
import { useMemo } from 'react';

export function Statistics() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const statistics = useMemo(
    () => [
      {
        label: 'Số lượng người dùng',
        count: 1000,
        icon: IconUsers,
        color: theme.colors.cyan[0],
        iconColor: theme.colors.cyan[8],
      },
      {
        label: 'Số lượng giáo viên',
        count: 200,
        icon: IconUserEdit,
        color: theme.colors.red[1],
        iconColor: theme.colors.red[9],
      },
      {
        label: 'Số lượng học sinh',
        count: 200,
        icon: IconSchool,
        color: theme.colors.yellow[1],
        iconColor: theme.colors.yellow[9],
      },
    ],
    [],
  );
  return (
    <Paper withBorder shadow='sm' p='sm' radius='md'>
      <Grid>
        {statistics.map((item, index) => {
          return (
            <Grid.Col span={{ sm: 12, lg: 4 }}>
              <Card
                bg={colorScheme === 'light' ? item.color : alpha(theme.colors.blue[1], 0.1)}
                shadow='none'
                key={index}
              >
                <Group align='center'>
                  <item.icon size='2rem' stroke={1.5} color={item.iconColor} />
                  <Stack gap={-10}>
                    <Text size='sm' fw={500}>
                      {item.label}
                    </Text>
                    <Text size='md' fw={700}>
                      {item.count}
                    </Text>
                  </Stack>
                </Group>
              </Card>
            </Grid.Col>
          );
        })}
      </Grid>
    </Paper>
  );
}
