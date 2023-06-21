import { QueryClientConfig } from '@tanstack/react-query'

const QUERY_CONFIG = (setErrors: Function): QueryClientConfig => {
  return {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60,
        retry: 0,
        useErrorBoundary(error: any) {
          setErrors && setErrors(error?.response?.data)
          return false
        },
      },
    },
  }
}

export { QUERY_CONFIG }
