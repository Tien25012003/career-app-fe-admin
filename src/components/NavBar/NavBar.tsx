import { AppShell, ScrollArea, useMantineColorScheme, useMantineTheme, NavLink, HoverCard, Stack, Text, Box, Group, ActionIcon } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { NavElement } from '@type/ui/navElements';
import { miniNavbarAtom } from 'atoms/AppAtoms';
import { navElements } from 'constants/navElements';
import { useLargerThan } from 'hooks';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

type TNavLink = {
  item: NavElement;
  children?: React.ReactNode;
  showLabel?: boolean;
  active?: boolean;
};
const CustomNavLink = ({ item, children, showLabel = true, active }: TNavLink) => {
  const location = useLocation();
  const theme = useMantineTheme();
  const [miniNavbar] = useAtom(miniNavbarAtom);
  const { colorScheme } = useMantineColorScheme();

  return (
    <NavLink
      variant={colorScheme === 'light' ? 'filled' : 'light'}
      key={item.label}
      style={{
        borderRadius: theme.radius.sm,
      }}
      styles={{
        section: {
          marginRight: miniNavbar ? 0 : 10,
        },
      }}
      label={showLabel ? item.label : ''}
      component={Link}
      to={item.link || ''}
      leftSection={item.icon && <item.icon size={'1.25rem'} stroke={1.5} style={{ marginRight: 0 }} />}
      childrenOffset={'1rem'}
      //active={item.link === location.pathname}
      active={active}
      h='2.625rem'
    >
      {children && children}
    </NavLink>
  );
};
export function NavBar() {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const [miniNavbar, setMiniNavbar] = useAtom(miniNavbarAtom);
  const largerThanMd = useLargerThan('md');
  useEffect(() => {
    if (largerThanMd !== undefined && !largerThanMd) {
      setMiniNavbar(true);
    } else if (largerThanMd) {
      setMiniNavbar(false);
    }
  }, [largerThanMd]);

  return (
    <AppShell.Navbar>
      <AppShell.Section grow component={ScrollArea} p={theme.spacing.md} scrollbarSize={10}>
        {!miniNavbar
          ? navElements.map((navElement) => (
              <CustomNavLink
                item={navElement}
                active={navElement.link ? location.pathname.endsWith(navElement.link) || location.pathname.startsWith(`${navElement.link}/`) : false}
              >
                {navElement.children?.map((childNavElement) => {
                  return (
                    <CustomNavLink
                      item={childNavElement}
                      active={
                        childNavElement.link
                          ? location.pathname.endsWith(childNavElement.link) || location.pathname.startsWith(`${childNavElement.link}/`)
                          : false
                      }
                    />
                  );
                })}
              </CustomNavLink>
            ))
          : navElements.map((navElement) => (
              <HoverCard key={navElement.label} position='right'>
                <HoverCard.Target>
                  <Box>
                    <CustomNavLink
                      item={navElement}
                      showLabel={false}
                      active={
                        navElement.link ? location.pathname.endsWith(navElement.link) || location.pathname.startsWith(`${navElement.link}/`) : false
                      }
                    />
                  </Box>
                </HoverCard.Target>
                <HoverCard.Dropdown bg={colorScheme === 'dark' ? theme.colors.dark[7] : theme.white} pb='0'>
                  <Stack gap={'xs'}>
                    <Text c='dimmed' size='sm'>
                      {navElement.label}
                    </Text>
                    <Box>
                      {navElement.children?.map((childNavElement) => (
                        <CustomNavLink
                          item={childNavElement}
                          active={
                            childNavElement.link
                              ? location.pathname.endsWith(childNavElement.link) || location.pathname.startsWith(`${childNavElement.link}/`)
                              : false
                          }
                        />
                      ))}
                    </Box>
                  </Stack>
                </HoverCard.Dropdown>
              </HoverCard>
            ))}
      </AppShell.Section>
      <AppShell.Section>
        <Group
          py='sm'
          style={{
            borderTop: `1px solid ${colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
          }}
          mx='lg'
          align='center'
          justify='space-between'
        >
          {!miniNavbar && (
            <Text c='dimmed' size='xs'>
              version 1.1
            </Text>
          )}
          <ActionIcon variant='default' onClick={() => setMiniNavbar(!miniNavbar)}>
            {miniNavbar ? <IconChevronRight size='1.125rem' stroke={1.5} /> : <IconChevronLeft size='1.125rem' stroke={1.5} />}
          </ActionIcon>
        </Group>
      </AppShell.Section>
    </AppShell.Navbar>
  );
}
