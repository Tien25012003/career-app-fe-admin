import { AppShell, Box, Group, HoverCard, NavLink, ScrollArea, Stack, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { NavElement } from '@type/ui/navElements';
import { hideNavbarAtom, miniNavbarAtom } from 'atoms/AppAtoms';
import { userInfoAtom } from 'atoms/auth.store';
import { navElements } from 'constants/navElements';
import { useLargerThan } from 'hooks';
import { useAtom } from 'jotai';
import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

type TNavLink = {
  item: NavElement;
  children?: React.ReactNode;
  showLabel?: boolean;
  active?: boolean;
  className?: string;
};
const CustomNavLink = ({ item, children, showLabel = true, active, className }: TNavLink) => {
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
      className={className}
      label={showLabel ? item.label : ''}
      component={Link}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      to={item.link || undefined}
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
  const [hideNavbar] = useAtom(hideNavbarAtom);
  const largerThanMd = useLargerThan('md');
  const largerThanSm = useLargerThan('sm');

  const [userInfo] = useAtom(userInfoAtom);

  // HANDLE PERMISSIONS
  const permissionCodes = useMemo<string[] | []>(() => userInfo?.permissions?.map((p) => p.code) || [], [userInfo?.permissions]);

  // const permissionNavElements = useMemo(() => navElements?.filter((item) => permissionCodes?.includes(item?.code as never)), [userInfo?.permissions]);

  const permissionNavElements = useMemo(() => {
    const filterNav = (elements: NavElement[] | []): NavElement[] => {
      return elements
        .filter((item) => permissionCodes.includes(item.code as never)) // Filter parent elements
        .map((item) => ({
          ...item,
          children: item.children ? filterNav(item.children) : undefined, // Recursively filter children
        }));
    };
    return filterNav(navElements);
  }, [permissionCodes]);

  // EFFECTS
  useEffect(() => {
    if (!largerThanSm) {
      setMiniNavbar(false);
    } else if (largerThanMd !== undefined && !largerThanMd) {
      setMiniNavbar(true);
    } else if (largerThanMd) {
      setMiniNavbar(false);
    }
  }, [largerThanMd, largerThanSm]);

  return (
    <AppShell.Navbar>
      <AppShell.Section grow component={ScrollArea} p={theme.spacing.md} scrollbarSize={10}>
        {!miniNavbar
          ? permissionNavElements?.map((navElement, index) => (
              <CustomNavLink
                key={index}
                item={navElement}
                active={navElement.link ? location.pathname.endsWith(navElement.link) || location.pathname.startsWith(`${navElement.link}/`) : false}
              >
                {navElement?.children?.map((childNavElement, childIndex) => {
                  return (
                    <CustomNavLink
                      key={childIndex}
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
          : permissionNavElements?.map((navElement, index) => (
              <HoverCard key={navElement.label} position='right'>
                <HoverCard.Target>
                  <Box>
                    <CustomNavLink
                      key={index}
                      item={navElement}
                      showLabel={false}
                      // showLabel={!largerThanMd && !hideNavbar}
                      active={
                        navElement.link ? location?.pathname?.endsWith(navElement.link) || location.pathname.startsWith(`${navElement.link}/`) : false
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
                      {navElement?.children?.map((childNavElement, childIndex) => (
                        <CustomNavLink
                          className={'mb-2'}
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
          {/* <ActionIcon variant='default' onClick={() => setMiniNavbar(!miniNavbar)}>
            {miniNavbar ? <IconChevronRight size='1.125rem' stroke={1.5} /> : <IconChevronLeft size='1.125rem' stroke={1.5} />}
          </ActionIcon> */}
        </Group>
      </AppShell.Section>
    </AppShell.Navbar>
  );
}
