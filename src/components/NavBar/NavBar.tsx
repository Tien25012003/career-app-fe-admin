import {
  AppShell,
  ScrollArea,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { miniNavbarAtom } from "atoms/AppAtoms";
import { useAtom } from "jotai";
import React from "react";
import { useLocation } from "react-router-dom";

export function NavBar() {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const [miniNavbar, setMiniNavbar] = useAtom(miniNavbarAtom);
  //const largerThanSm = useLargerThan("sm");
  const location = useLocation();
  return (
    <AppShell.Navbar w={{ sm: miniNavbarAtom ? 90 : 275 }}>
      <AppShell.Section
        grow
        component={ScrollArea}
        p={theme.spacing.md}
        scrollbarSize={10}
      ></AppShell.Section>
    </AppShell.Navbar>
  );
}
