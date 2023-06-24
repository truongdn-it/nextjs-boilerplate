import { QueryClientConfig } from '@tanstack/react-query';

const queryConfig = (setErrors: Function): QueryClientConfig => {
  return {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60,
        retry: 0,
        useErrorBoundary(error: any) {
          setErrors && setErrors(error?.response?.data);
          return false;
        },
      },
    },
  };
};

export { queryConfig };
