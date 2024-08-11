import { Header } from "@component/Header";
import {
  AppShell,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { hideNavbarAtom } from "atoms/AppAtoms";
import { useAtom } from "jotai";
import React, { useMemo } from "react";
import { Outlet } from "react-router-dom";

export function HomePage() {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const [hideNavbar] = useAtom(hideNavbarAtom);

  const appSheelStyles = useMemo(
    () => ({
      main: {
        background:
          colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
        width: "100%",
      },
    }),
    [colorScheme]
  );
  return (
    <AppShell
      style={appSheelStyles}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: hideNavbar },
      }}
      header={{ height: 65 }}
    >
      <Header />
      <AppShell.Main
        bg={
          colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0]
        }
        ml={{ sm: -25 }}
      >
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
