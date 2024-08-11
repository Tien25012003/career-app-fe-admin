import { HeaderLogo } from "@icon/HeaderLogo";
import {
  AppShell,
  useMantineColorScheme,
  useMantineTheme,
  alpha,
  Group,
  Flex,
  Box,
  Burger,
} from "@mantine/core";
import { hideNavbarAtom } from "atoms/AppAtoms";
import { useAtom } from "jotai";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";

export function Header() {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const [hideNavbar, setHideNavbar] = useAtom(hideNavbarAtom);

  const mantineHeaderStyles = useMemo(
    () => ({
      backdropFilter: "saturate(180%) blur(15px)",
      backgroundColor:
        colorScheme === "dark"
          ? alpha(theme.colors.dark[7], 0.8)
          : alpha(theme.white, 0.8),
      borderBottom: "1px solid",
      borderColor:
        colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2],
    }),
    [colorScheme, theme.colors.dark, theme.colors.gray, theme.white]
  );
  return (
    <AppShell.Header h={65} px={10} style={mantineHeaderStyles}>
      <Group justify="space-between">
        <Flex align={"center"} h="100%">
          <Box hiddenFrom="sm">
            <Burger
              opened={!hideNavbar}
              onClick={() => setHideNavbar((o) => !o)}
              size="sm"
              color={theme.colors.gray[6]}
              mr="xl"
            />
          </Box>
          <Group gap={"md"}>
            <Box
              component={Link}
              to="/"
              style={{
                transition: "filter 0.5s, transform 0.2s",
                cursor: "pointer",
                "&:hover": { filter: "brightness(1.5)" },
                "&:active": { transform: "scale(0.95)" },
              }}
            >
              <HeaderLogo />
            </Box>
          </Group>
        </Flex>
      </Group>
    </AppShell.Header>
  );
}
