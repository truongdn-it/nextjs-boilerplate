/* eslint-disable no-console */
/* eslint-disable import/no-unused-modules */

import 'antd/dist/reset.css';
import '@styles/globals.scss';
import '@components/common/layout/admin-layout/styles.scss';

import React, { ReactElement, ReactNode, useEffect } from 'react';
import { NextPage } from 'next';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import { Open_Sans } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { UserStoreProvider } from '@/stores';
import { AdminStoreProvider } from '@/stores/admin';
import { GlobalStoreProvider } from '@/stores/global';
import { getSweetErrorConfig, logger } from '@/utils/helpers';
import {
  legacyLogicalPropertiesTransformer,
  StyleProvider,
} from '@ant-design/cssinjs';
import { ApolloProvider } from '@apollo/client';
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev';
import { useApollo } from '@services/apollo/client';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { App as AppAntd, ConfigProvider } from 'antd';
import type { ThemeConfig } from 'antd';
import { AxiosError } from 'axios';
import NProgress from 'nprogress';
import Swal from 'sweetalert2';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const openSans = Open_Sans({
  subsets: ['vietnamese'],
  display: 'swap',
  variable: '--font-sans',
});

function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60,
            retry: 0,
            throwOnError(error) {
              const descMsg =
                error instanceof AxiosError
                  ? error?.response?.data?.message
                  : 'Some thing went wrong!';
              // const errMsg =
              //   error instanceof AxiosError
              //     ? error?.response?.statusText
              //     : 'Some thing went wrong!';

              Swal.fire(getSweetErrorConfig(descMsg));

              return false;
            },
          },
        },
      }),
  );
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page);

  const THEME_CONFIG: ThemeConfig = {
    token: {
      fontFamily: `${openSans.style.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI',
          Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
          'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
    },
  };

  const apolloClient = useApollo(pageProps.initialApolloState);

  if (process.env.NODE_ENV === 'development') {
    loadDevMessages();
    loadErrorMessages();
  }

  useEffect(() => {
    router.events.on('routeChangeStart', () => NProgress.start());
    router.events.on('routeChangeComplete', () => NProgress.done());
    router.events.on('routeChangeError', () => NProgress.done());
  }, [router.events]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <ConfigProvider autoInsertSpaceInButton={false} theme={THEME_CONFIG}>
            <StyleProvider transformers={[legacyLogicalPropertiesTransformer]}>
              <ApolloProvider client={apolloClient}>
                <GlobalStoreProvider>
                  <UserStoreProvider>
                    <AdminStoreProvider>
                      {getLayout(
                        <AppAntd notification={{ placement: 'topRight' }}>
                          <Component {...pageProps} />
                        </AppAntd>,
                      )}
                    </AdminStoreProvider>
                  </UserStoreProvider>
                </GlobalStoreProvider>
              </ApolloProvider>
            </StyleProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </ConfigProvider>
        </HydrationBoundary>
      </QueryClientProvider>
    </>
  );
}

export default App;

export function reportWebVitals(metric: NextWebVitalsMetric) {
  switch (metric.name) {
    case 'TTFB':
      logger({
        message: `Thời gian phản hồi: ${(metric.value / 1000).toFixed(2)}s`,
        type: 'INFO',
      });

      break;
    case 'FCP':
      logger({
        message: `Thời gian hiển thị nội dung đầu tiên: ${(
          metric.value / 1000
        ).toFixed(2)}s`,
        type: 'INFO',
      });
      break;
  }
}
