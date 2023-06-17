/* eslint-disable import/no-unused-modules */

import '@styles/globals.css'

import React, { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import { QUERY_CONFIG } from '@utils/constants/query.config'
import { THEME_CONFIG } from '@utils/constants/theme.config'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = React.useState(() => new QueryClient(QUERY_CONFIG))
  const getLayout = Component.getLayout ?? ((page) => page)
  return getLayout(
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ConfigProvider autoInsertSpaceInButton={false} theme={THEME_CONFIG}>
          <Component {...pageProps} />
        </ConfigProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default App
