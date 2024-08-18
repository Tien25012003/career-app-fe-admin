import { MantineProvider, MantineThemeOverride } from '@mantine/core';
import { useAtom } from 'jotai';
import { colorSchemeAtom } from './atoms/AppAtoms';

// declare module "@mantine/core" {

// }
export const theme: MantineThemeOverride = {
  other: {
    altMonospace: 'JetBrains Mono, monospace',
    altSansSerif: 'Montserrat, sans-serif',
    textEllipsis: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  },
  colors: {
    main: [
      '#00BF63',
      '#dff8c3',
      '#77daba',
      '#00BF63',
      '#00BF63',
      '#fdf278',
      '#00BF63', // primary
      '#00BF63',
      '#00BF63',
      '#e2f0f6',
    ],
    ...(MantineProvider.defaultProps?.theme?.colors || {}),
  },
  primaryColor: 'main',
};
interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [colorScheme] = useAtom(colorSchemeAtom);
  return (
    <MantineProvider
      withCssVariables
      withGlobalClasses
      withNormalizeCSS
      theme={{ ...theme, colorScheme }}
    >
      {children}
    </MantineProvider>
  );
}
