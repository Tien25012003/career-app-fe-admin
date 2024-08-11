import { QueryCache, QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (_error) => {
      console.log(_error);
    },
  }),
});
