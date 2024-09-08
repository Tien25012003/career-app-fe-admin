import { ActionIcon, Affix, Button, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconArrowUp } from '@tabler/icons-react';

export default function PageScrollToTop() {
  const [scroll, scrollTo] = useWindowScroll();
  return (
    <Affix position={{ bottom: 50, right: 20 }}>
      <Transition transition='slide-up' mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <ActionIcon variant='filled' radius={50} w={50} h={50} style={transitionStyles} onClick={() => scrollTo({ y: 0 })}>
            <IconArrowUp size={20} />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );
}
