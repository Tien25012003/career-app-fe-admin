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
      forceColorScheme='light'
    >
      {children}
    </MantineProvider>
  );
}
