const API_ROUTES = {
  GET_TASKS: '/api/get-tasks',
};

const WEB_ROUTES = {
  HOME: '/',
};

const NO_IMAGE = '/common/no-avatar.png';

const ACCESS_TOKEN_COOKIE_CONFIG = {
  maxAge: 60 * 5,
  httpOnly: false,
  secure: process.env.NEXT_PUBLIC_MODE_ENV !== 'development',
  sameSite: 'lax' as 'lax',
};

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
  ACCESS_TOKEN_COOKIE_CONFIG,
  REFRESH_TOKEN_COOKIE_CONFIG,
};
