import { Header } from '@component/Header';
import { NavBar } from '@component/NavBar';
import PageChatbot from '@component/PageChatbot/PageChatbot';
import PageScrollToTop from '@component/PageScrollToTop/PageScrollToTop';
import { AppShell, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { hideNavbarAtom, miniNavbarAtom } from 'atoms/AppAtoms';
import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { Outlet } from 'react-router-dom';

export function HomePage() {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const [hideNavbar] = useAtom(hideNavbarAtom);
  const [miniNavbar] = useAtom(miniNavbarAtom);

  const appSheelStyles = useMemo(
    () => ({
      main: {
        background: colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
      },
    }),
    [colorScheme, theme.colors.dark, theme.colors.gray],
  );
  return (
    <AppShell
      style={appSheelStyles}
      navbar={{
        width: miniNavbar ? 80 : 300,
        breakpoint: 'sm',
        collapsed: { mobile: hideNavbar },
      }}
      header={{ height: 65 }}
    >
      <Header />
      <NavBar />
      <AppShell.Main bg={colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]}>
        <Outlet />
        {/* <PageScrollToTop /> */}
        <PageChatbot />
      </AppShell.Main>
    </AppShell>
  );
}
