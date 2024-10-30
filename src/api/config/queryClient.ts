import { QueryCache, QueryClient } from '@tanstack/react-query';
import { NotifyUtils } from '@util/NotificationUtils';
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (_error, query) => {
      NotifyUtils.error((query.meta?.errorMessage as string) || 'Lấy dữ liệu không thành công');
    },
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
