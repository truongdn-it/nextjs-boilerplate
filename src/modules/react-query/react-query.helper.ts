import { QueryClientConfig } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const queryConfig = (
  setErrors: (errors: SetErrorsStoreParams) => void,
): QueryClientConfig => {
  return {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60,
        retry: 0,
        throwOnError(error, query) {
          const descMsg =
            error instanceof AxiosError
              ? error?.response?.data?.error
              : 'Some thing went wrong!';

          const errMsg =
            error instanceof AxiosError
              ? error?.response?.statusText
              : 'Some thing went wrong!';
          setErrors &&
            setTimeout(() => {
              setErrors({ message: errMsg as string, description: descMsg });
            }, 0);
          return false;
        },
      },
    },
  };
};

export { queryConfig };
