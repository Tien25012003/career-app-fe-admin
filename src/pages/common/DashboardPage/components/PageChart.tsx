import {
  AreaChart,
  AreaChartSeries,
  BarChart,
  BarChartSeries,
  GridChartBaseProps,
  LineChart,
  LineChartSeries,
} from '@mantine/charts';
import { Paper, Text } from '@mantine/core';
const ChartType = {
  AreaChart: AreaChart,
  LineChart: LineChart,
  BarChart: BarChart,
};
type TPageLineChart<T> = {
  title?: string;
  series: AreaChartSeries[] & LineChartSeries[] & BarChartSeries[];
  dataKey: string;
  data: Record<string, T>[];
  chartType: 'AreaChart' | 'LineChart' | 'BarChart';
  withBarValueLabel?: boolean;
} & GridChartBaseProps;

export function PageChart<T>({
  title,
  series,
  dataKey,
  data,
  chartType,
  withBarValueLabel,
  ...props
}: TPageLineChart<T>) {
  const ChartComponent = ChartType[chartType];
  return (
    <Paper withBorder shadow='sm' p='sm' radius='md'>
      <Text size='lg' fw={500} mb='md'>
        {title}
      </Text>
      <ChartComponent
        data={data}
        h={300}
        series={series}
        dataKey={dataKey}
        withBarValueLabel={withBarValueLabel}
        withXAxis
        {...props}
      />
    </Paper>
  );
}
