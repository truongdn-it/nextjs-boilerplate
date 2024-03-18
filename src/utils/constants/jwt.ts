const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';
const REFRESH_TOKEN_STORAGE_KEY = 'refreshToken';

const MAX_AGE_ACCESS_TOKEN = 60 * 5; // 5 minutes
const MAX_AGE_REFRESH_TOKEN = 60 * 60 * 24 * 7; // 7 days

const ACCESS_TOKEN_COOKIE_CONFIG = {
  maxAge: MAX_AGE_ACCESS_TOKEN,
  httpOnly: false,
  secure: process.env.NODE_ENV !== 'development',
  sameSite: 'lax' as 'lax',
};

const REFRESH_TOKEN_COOKIE_CONFIG = {
  maxAge: MAX_AGE_REFRESH_TOKEN,
  httpOnly: false,
  secure: process.env.NODE_ENV !== 'development',
  sameSite: 'lax' as 'lax',
};

// eslint-disable-next-line no-unused-vars
enum AUTH_METHOD {
  // eslint-disable-next-line no-unused-vars
  COOKIE = 'cookie',
  // eslint-disable-next-line no-unused-vars
  HEADER = 'header',
}

export {
  ACCESS_TOKEN_COOKIE_CONFIG,
  REFRESH_TOKEN_COOKIE_CONFIG,
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
  AUTH_METHOD,
};
