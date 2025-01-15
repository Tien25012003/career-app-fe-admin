import { getReportAPI } from '@api/services/report/report.api';
import { EGroup, EGroupDashboard, EHolland } from '@enum/exam';
import { Grid, Transition, useMantineTheme } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from 'constants/query-key.constants';
import { useMemo } from 'react';
import { getHollandColor, getSchoolGroupColor } from '../utils/getHollandColor';
import { PageChart } from './PageChart';

const EQDummyData = [
  { score: '0', count: 10 },
  { score: '60', count: 60 },
  { score: '120', count: 100 },
  { score: '140', count: 60 },
  { score: '200', count: 10 },
];
const IQDummyData = [
  { score: '0', count: 20 },
  { score: '54', count: 100 },
  { score: '72', count: 150 },
  { score: '90', count: 120 },
  { score: '105', count: 90 },
  { score: '120', count: 50 },
];

const ScoreDummyData = [
  { score: '0', count: 0 },
  { score: '1', count: 0 },
  { score: '2', count: 20 },
  { score: '3', count: 40 },
  { score: '4', count: 80 },
  { score: '6', count: 120 },
  { score: '7', count: 100 },
  { score: '8', count: 80 },
  { score: '9', count: 40 },
  { score: '10', count: 10 },
];

const HollandDummyData = [
  { type: 'R', count: 30, color: 'red' },
  { type: 'I', count: 60, color: 'orange' },
  { type: 'A', count: 100, color: 'yellow' },
  { type: 'S', count: 120, color: 'green' },
  { type: 'E', count: 60, color: 'blue' },
  { type: 'C', count: 30, color: 'purple' },
];

const SchoolData = [
  { type: 'A0', count: 30, color: 'red' },
  { type: 'A1', count: 60, color: 'orange' },
  { type: 'B', count: 100, color: 'yellow' },
  { type: 'C', count: 120, color: 'green' },
  { type: 'D1', count: 60, color: 'blue' },
  { type: 'D7', count: 30, color: 'purple' },
];

type ScoreChartItemProps = {
  type?: string;
  score?: number;
  color?: string;
};

export function ScoreChart() {
  const theme = useMantineTheme();

  // APIS
  const {
    data: fetchedReport,
    //isFetching,
    isLoading,
  } = useQuery({
    queryKey: [QUERY_KEYS.REPORT.SCORES],
    queryFn: () => getReportAPI(),
    select: ({ data }) => data,
  });

  const IQData = useMemo<ScoreChartItemProps[] | []>(
    () => fetchedReport?.filter((item) => item.type === 'IQ')?.sort((a, b) => (a.score as number) - (b?.score as number)) || [],
    [fetchedReport],
  );

  const EQData = useMemo<ScoreChartItemProps[] | []>(
    () => fetchedReport?.filter((item) => item.type === 'EQ')?.sort((a, b) => (a.score as number) - (b?.score as number)) || [],
    [fetchedReport],
  );

  const SchoolScoreData = useMemo<ScoreChartItemProps[] | []>(
    () => fetchedReport?.filter((item) => item.type === 'SchoolScore')?.sort((a, b) => (a.score as number) - (b?.score as number)) || [],
    [fetchedReport],
  );

  const HollandData = useMemo<ScoreChartItemProps[] | []>(
    () =>
      fetchedReport
        ?.filter((item) => Object.keys(EHolland)?.includes(item.type as EHolland))
        ?.map((item) => ({
          ...item,
          color: getHollandColor(item.type as EHolland),
        })) || [],
    [fetchedReport],
  );

  const SchoolGroupData = useMemo<ScoreChartItemProps[] | []>(
    () =>
      fetchedReport
        ?.filter((item) => Object.keys(EGroupDashboard)?.includes(item.type as EGroup))
        ?.map((item) => ({
          ...item,
          color: getSchoolGroupColor(item.type as EGroupDashboard),
        })) || [],
    [fetchedReport],
  );

  return (
    <Grid>
      <Transition mounted={!isLoading} transition={'fade-right'} enterDelay={0}>
        {(styles) => (
          <Grid.Col span={{ sm: 12, lg: 6 }} style={styles}>
            <PageChart
              chartType='AreaChart'
              title='Thống kê điểm IQ'
              dataKey='score'
              data={IQData}
              series={[{ name: 'count', color: theme.colors.orange[8], label: 'Số lượng học sinh' }]}
              xAxisLabel='Số điểm IQ'
              yAxisLabel='Số lượng học sinh'
            />
          </Grid.Col>
        )}
      </Transition>
      <Transition mounted={!isLoading} transition={'fade-right'} enterDelay={50}>
        {(styles) => (
          <Grid.Col span={{ sm: 12, lg: 6 }} style={styles}>
            <PageChart
              chartType='AreaChart'
              title='Thống kê điểm EQ'
              dataKey='score'
              data={EQData}
              series={[{ name: 'count', color: theme.colors.green[8], label: 'Số lượng học sinh' }]}
              xAxisLabel='Số điểm EQ'
              yAxisLabel='Số lượng học sinh'
            />
          </Grid.Col>
        )}
      </Transition>

      {/* <Transition mounted={!isLoading} transition={'fade-right'} enterDelay={100}>
        {(styles) => (
          <Grid.Col span={{ sm: 12, lg: 4 }} style={styles}>
            <PageChart
              chartType='AreaChart'
              title='Thống kê điểm trung bình'
              dataKey='score'
              data={SchoolScoreData}
              series={[{ name: 'count', color: theme.colors.blue[8], label: 'Số lượng học sinh' }]}
              xAxisLabel='Điểm trung bình'
              yAxisLabel='Số lượng học sinh'
            />
          </Grid.Col>
        )}
      </Transition> */}

      <Transition mounted={!isLoading} transition={'fade-right'} enterDelay={150}>
        {(styles) => (
          <Grid.Col span={{ sm: 12, lg: 6 }} style={styles}>
            <PageChart
              chartType='BarChart'
              title='Thống kê Holland'
              dataKey='type'
              data={HollandData}
              series={[{ name: 'count', color: theme.colors.blue[8], label: 'Số lượng học sinh' }]}
              xAxisLabel='Các nhóm Holland'
              yAxisLabel='Số lượng học sinh'
              withTooltip={false}
              withBarValueLabel={true}
            />
          </Grid.Col>
        )}
      </Transition>

      <Transition mounted={!isLoading} transition={'fade-right'} enterDelay={200}>
        {(styles) => (
          <Grid.Col span={{ sm: 12, lg: 6 }} style={styles}>
            <PageChart
              chartType='BarChart'
              title='Thống kê khối thi'
              dataKey='type'
              data={SchoolGroupData}
              series={[{ name: 'count', color: theme.colors.blue[8], label: 'Số lượng học sinh' }]}
              xAxisLabel='Khối thi'
              yAxisLabel='Số lượng học sinh'
              withTooltip={false}
              withBarValueLabel={true}
            />
          </Grid.Col>
        )}
      </Transition>
    </Grid>
  );
}
