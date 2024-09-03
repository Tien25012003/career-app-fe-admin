import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import '@mantine/tiptap/styles.css';

import { routes } from './routes';
import { useNavigate, useRoutes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/services/queryClient';
import { ModalsProvider } from '@mantine/modals';
import { Provider as JotaiProvider } from 'jotai';
import { store } from './atoms/store';
import { ThemeProvider } from './ThemeProvider';
import { DevTools as JotaiDevTools } from 'jotai-devtools';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import { useEffect } from 'react';
function App() {
  const appRoutes = useRoutes(routes);
  // TO DO:  replace with API Authe
  // const navigate = useNavigate();
  // useEffect(() => {
  //   navigate("/login");
  // }, []);
  //
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider store={store}>
        <ThemeProvider>
          <ModalsProvider>{appRoutes}</ModalsProvider>
        </ThemeProvider>
        <JotaiDevTools />
      </JotaiProvider>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-right' />
    </QueryClientProvider>
  );
}

export default App;
