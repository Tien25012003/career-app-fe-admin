import '@mantine/charts/styles.css';
import '@mantine/core/styles.css';
import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/tiptap/styles.css';
import 'mantine-datatable/styles.layer.css';

import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai';
import { useRoutes } from 'react-router-dom';
import { queryClient } from './api/config/queryClient';
import { store } from './atoms/store';
import './index.css';
import { routes } from './routes';
import { ThemeProvider } from './ThemeProvider';
function App() {
  const appRoutes = useRoutes(routes);

  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider store={store}>
        <ThemeProvider>
          <Notifications />
          <ModalsProvider>{appRoutes}</ModalsProvider>
        </ThemeProvider>
        {/* <JotaiDevTools /> */}
      </JotaiProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-right' /> */}
    </QueryClientProvider>
  );
}

export default App;
