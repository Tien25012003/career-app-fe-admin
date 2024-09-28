import { ActionButton } from '@component/ActionButton';
import { HeaderLogo } from '@icon/HeaderLogo';
import { AppShell, useMantineColorScheme, useMantineTheme, alpha, Group, Flex, Box, Burger, Menu, Button } from '@mantine/core';
import { IconLogout, IconMoonStars, IconSun, IconUserCircle } from '@tabler/icons-react';
import { hideNavbarAtom } from 'atoms/AppAtoms';
import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const [hideNavbar, setHideNavbar] = useAtom(hideNavbarAtom);

  const handleChangeColorScheme = () => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');

  const mantineHeaderStyles = useMemo(
    () => ({
      backdropFilter: 'saturate(180%) blur(15px)',
      backgroundColor: colorScheme === 'dark' ? alpha(theme.colors.dark[7], 0.8) : alpha(theme.white, 0.8),
      borderBottom: '1px solid',
      borderColor: colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2],
    }),
    [colorScheme, theme.colors.dark, theme.colors.gray, theme.white],
  );
  return (
    <AppShell.Header h={65} px={10} style={mantineHeaderStyles}>
      <Group justify='space-between'>
        <Flex align={'center'} h='100%'>
          <Box hiddenFrom='sm'>
            <Burger opened={!hideNavbar} onClick={() => setHideNavbar((o: boolean) => !o)} size='sm' color={theme.colors.gray[6]} mr='sm' />
          </Box>
          <Group gap={'md'}>
            <Box component={Link} to='/' className='hover:scale-110 hover:brightness-110 transition duration-300'>
              <HeaderLogo />
            </Box>
          </Group>
        </Flex>
        <Flex align={'center'} visibleFrom='sm'>
          <Group gap={'xs'}>
            <ActionButton tooltip={'Trang cá nhân'} icon={IconUserCircle} onClick={() => {}} />
            <ActionButton
              tooltip={colorScheme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}
              icon={colorScheme === 'dark' ? IconSun : IconMoonStars}
              onClick={handleChangeColorScheme}
            />
            <ActionButton tooltip='Đăng xuất' icon={IconLogout} onClick={() => {}} />
          </Group>
        </Flex>
        <Flex align={'center'} hiddenFrom='sm'>
          <Menu shadow='md' width={200}>
            <Menu.Target>
              <Button>Menu</Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item leftSection={<IconUserCircle size='1.125rem' stroke={1.5} />}>Trang cá nhân</Menu.Item>
              <Menu.Item
                leftSection={colorScheme === 'dark' ? <IconSun size='1.375rem' stroke={1.5} /> : <IconMoonStars size='1.375rem' stroke={1.5} />}
                onClick={handleChangeColorScheme}
              >
                {colorScheme === 'dark' ? 'Chế độ sáng' : 'Chế độ tối'}
              </Menu.Item>
              <Menu.Item leftSection={<IconLogout size='1.125rem' stroke={1.5} />} onClick={() => {}}>
                Đăng xuất
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </Group>
    </AppShell.Header>
  );
}
