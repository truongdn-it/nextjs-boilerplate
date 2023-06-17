import { QueryClientConfig } from '@tanstack/react-query'

const QUERY_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
}

export { QUERY_CONFIG }
