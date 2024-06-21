import './env.mjs';

/** @type {import('next').NextConfig} */

import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';
import { sentryWebpackPlugin } from '@sentry/webpack-plugin';

const runWithBundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig = runWithBundleAnalyzer({
  reactStrictMode: true,
  output: 'standalone',
  experimental: {
    webVitalsAttribution: ['FCP', 'TTFB'],
    serverActions: {
      allowedOrigins: process.env.ALLOWED_ORIGINS?.split(','),
    },
    serverComponentsExternalPackages: ['pino-pretty'],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'debug'],
          }
        : false,
  },
  swcMinify: true,
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'globalThis.__DEV__': false,
      }),
    );

    if (process.env.NODE_ENV === 'production') {
      config.devtool = 'source-map';
      config.plugins.push(
        sentryWebpackPlugin({
          org: 'example',
          project: process.env.SENTRY_PROJECT,
          authToken: process.env.SENTRY_AUTH_TOKEN,
        }),
      );
    }

    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  poweredByHeader: false,

  images: {
    minimumCacheTTL: process.env.NODE_ENV === 'production' ? 60 : 0,
    formats: ['image/webp'],
    remotePatterns:
      process.env.ALLOWED_RESOURCES?.split(',').map((remote) => {
        return { hostname: remote };
      }) ?? [],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
});

const sentryNextConfig = withSentryConfig(
  nextConfig,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: 'example',
    project: process.env.SENTRY_PROJECT,
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    // tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  },
);

export default process.env.NODE_ENV === 'production'
  ? nextConfig
  : sentryNextConfig;
