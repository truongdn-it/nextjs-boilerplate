import { DefaultSeoProps } from 'next-seo';

const API_ROUTES = {
  GET_TASKS: '/api/get-tasks',
};

const WEB_ROUTES = {
  HOME: '/',
};

const QUERY_KEYS = {
  GET_TASKS: 'GET_TASKS',
};

const SEO: DefaultSeoProps = {
  title: 'Nextjs Core Project',
  description: 'Nextjs Core Project by TruongDN',
  titleTemplate: '%s | Nextjs Core Project',
  openGraph: {
    type: 'website',
    locale: 'en',
    url: 'https://nextjs-core-project.vercel.app',
    siteName: 'Nextjs Core Project',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

const NO_IMAGE = '/common/no-avatar.png';

const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';

const ACCESS_TOKEN_COOKIE_CONFIG = {
  maxAge: 60 * 5,
  httpOnly: false,
  secure: process.env.NEXT_PUBLIC_MODE_ENV !== 'development',
  sameSite: 'lax' as 'lax',
};

const REFRESH_TOKEN_STORAGE_KEY = 'refreshToken';

const REFRESH_TOKEN_COOKIE_CONFIG = {
  maxAge: 60 * 60 * 24 * 7,
  httpOnly: false,
  secure: process.env.NEXT_PUBLIC_MODE_ENV !== 'development',
  sameSite: 'lax' as 'lax',
};

export {
  API_ROUTES,
  WEB_ROUTES,
  NO_IMAGE,
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
  ACCESS_TOKEN_COOKIE_CONFIG,
  REFRESH_TOKEN_COOKIE_CONFIG,
  QUERY_KEYS,
  SEO,
};
