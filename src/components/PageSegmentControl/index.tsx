import { alpha, SegmentedControl, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import React from 'react';
import { theme } from 'ThemeProvider';

export default function PageSegmentControl() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  return (
    <SegmentedControl
      data={[
        { value: 'React', label: 'React' },
        { value: 'Angular', label: 'Angular' },
        { value: 'Svelte', label: 'Svelte' },
        { value: 'Vue', label: 'Vue' },
      ]}
      withItemsBorders={false}
      fullWidth={false}
      size='sm'
      className='mr-auto'
      style={{}}
      styles={{
        root: {
          backgroundColor: colorScheme === 'light' ? theme.white : alpha(theme.colors.blue[1], 0.1),
          boxShadow: theme.shadows.sm,
        },
      }}
      color={theme.primaryColor}
    />
  );
}
