/* eslint-disable no-console */
/* eslint-disable import/no-unused-modules */

import 'antd/dist/reset.css';
import '@styles/globals.scss';

import React, { ReactElement, ReactNode, useEffect } from 'react';
import { NextPage } from 'next';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import { Open_Sans } from 'next/font/google';
import Head from 'next/head';
import { useErrorsStore } from '@/components/common/modal/errors-modal/errors-modal.store';
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
import chalk from 'chalk';
import { useLocalesStore } from '@utils/helpers/locales/locales.store';
import { queryConfig } from '@utils/helpers/queries/queries.helper';

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
  const [hydated, seHydrated] = React.useState(false);
  const setDict = useLocalesStore((state) => state.setDict);
  const locale = useLocalesStore((state) => state.locale);
  const setErrors = useErrorsStore((state) => state.setErrors);

  useEffect(() => {
    seHydrated(true);
  }, []);

  useEffect(() => {
    hydated && setDict(locale);
  }, [hydated, locale, setDict]);

  const [queryClient] = React.useState(
    () => new QueryClient(queryConfig(setErrors)),
  );
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
                {hydated &&
                  getLayout(
                    <AppAntd notification={{ placement: 'topRight' }}>
                      <Component {...pageProps} />
                    </AppAntd>,
                  )}
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
      console.info(
        chalk.green(`Thời gian phản hồi: ${(metric.value / 1000).toFixed(2)}s`),
      );
      break;
    case 'FCP':
      console.info(
        chalk.green(
          `Thời gian hiển thị nội dung đầu tiên: ${(
            metric.value / 1000
          ).toFixed(2)}s`,
        ),
      );
      break;
  }
}
