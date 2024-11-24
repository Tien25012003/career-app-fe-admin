import { getStatisticsAPI } from '@api/services/report/report.api';
import { EROLE } from '@enum/account.enum';
import { ActionIcon, alpha, Card, Grid, Group, Image, Paper, Stack, Text, Transition, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { Icon, IconPencil, IconPencilMinus, IconSchool, IconUserEdit, IconUsers } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { userInfoAtom } from 'atoms/auth.store';
import { QUERY_KEYS } from 'constants/query-key.constants';
import { useAtom } from 'jotai';
import React, { useMemo, useState } from 'react';
import EditUserInfoModal from './EditUserInfoModal';

type StatisticItemProps = {
  label: string;
  count: number;
  icon: Icon;
  color?: string;
  iconColor?: string;
  isHide?: boolean;
};

export function Statistics() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const [userInfo] = useAtom(userInfoAtom);
  const userRole = useMemo(() => userInfo?.role, [userInfo?.role]);

  // STATES
  const [openModalEditInfo, setOpenModalEditInfo] = useState(false);

  // APIS
  const {
    data: fetchedStatistics,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.REPORT.STATISTICS],
    queryFn: () => getStatisticsAPI(),
    select: ({ data }) => data,
  });

  const proccessedStatistics = useMemo<StatisticItemProps[]>(
    () => [
      {
        label: 'Số lượng nhóm',
        count: fetchedStatistics?.groups || 0,
        icon: IconUsers,
        color: theme.colors.cyan[0],
        iconColor: theme.colors.cyan[8],
      },
      {
        label: 'Số lượng giáo viên',
        count: fetchedStatistics?.teachers || 0,
        icon: IconUserEdit,
        color: theme.colors.red[1],
        iconColor: theme.colors.red[9],
        isHide: userRole !== EROLE.ADMIN,
      },
      {
        label: 'Số lượng học sinh',
        count: fetchedStatistics?.students || 0,
        icon: IconSchool,
        color: theme.colors.yellow[1],
        iconColor: theme.colors.yellow[9],
      },
      {
        label: 'Số bài kiểm tra',
        count: fetchedStatistics?.exams || 0,
        icon: IconPencil,
        color: theme.colors.grape[1],
        iconColor: theme.colors.grape[9],
      },
    ],
    [fetchedStatistics, userRole],
  );

  const statistics = proccessedStatistics?.filter((item) => !item.isHide);

  const lg = useMemo(() => (userInfo?.role === EROLE?.ADMIN ? 24 / statistics?.length : 6), [statistics?.length, userInfo?.role]);

  return (
    <React.Fragment>
      <Transition mounted={true} transition={'fade'}>
        {(styles) => (
          <Paper withBorder shadow='sm' p='sm' radius='md' style={styles}>
            <Grid>
              <Grid.Col span={{ sm: 12, lg: 3 }}>
                <Card
                  bg={colorScheme === 'light' ? alpha(theme.colors.gray[1], 0.1) : alpha(theme.colors.blue[1], 0.1)}
                  shadow='none'
                  className='h-full rounded-lg'
                  withBorder
                >
                  <Stack>
                    <Group gap={12} justify='space-between'>
                      <Group>
                        <Image
                          src={'https://t3.ftcdn.net/jpg/06/57/85/22/360_F_657852299_5py03y6oH4mrUDyZnf9XxFSFfrjcqAzP.jpg'}
                          w={64}
                          h={64}
                          radius={100}
                          className='border-[2px] shadow-sm'
                        />
                        <Stack gap={0}>
                          <Text size='md' fw={500}>
                            {userInfo?.role}
                          </Text>
                          <Text size='md' fw={600}>
                            {userInfo?.username}
                          </Text>
                        </Stack>
                      </Group>
                      <ActionIcon variant='transparent' onClick={() => setOpenModalEditInfo(true)}>
                        <IconPencilMinus size={'1.125rem'} stroke={1.5} />
                      </ActionIcon>
                    </Group>
                    <Stack gap={2}>
                      <Text size='md' fw={400}>
                        Tên: {userInfo?.name}
                      </Text>
                      <Text size='sm' fw={400}>
                        Email: {userInfo?.email}
                      </Text>
                    </Stack>
                  </Stack>
                </Card>
              </Grid.Col>
              <Grid.Col span={{ sm: 12, lg: 9 }}>
                <Grid>
                  {statistics.map((item, index) => {
                    // if (isFetching) return <Skeleton height={20} radius='sm' />;
                    return (
                      <Transition mounted={!isLoading} transition={'fade-right'} enterDelay={index * 50}>
                        {(styles) => (
                          <Grid.Col span={{ sm: 12, lg: lg }} style={styles}>
                            <Card bg={colorScheme === 'light' ? item.color : alpha(theme.colors.blue[1], 0.1)} shadow='none' key={index}>
                              <Group align='center' wrap='nowrap'>
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
                        )}
                      </Transition>
                    );
                  })}
                </Grid>
              </Grid.Col>
            </Grid>
          </Paper>
        )}
      </Transition>
      <EditUserInfoModal open={openModalEditInfo} onClose={() => setOpenModalEditInfo(false)} />
    </React.Fragment>
  );
}
