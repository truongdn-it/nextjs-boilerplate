import { QueryClientConfig } from '@tanstack/react-query';

const queryConfig = (): QueryClientConfig => {
  return {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60,
        retry: 0,
      },
    },
  };
};

export { queryConfig };
