import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const env = createEnv({
  server: {
    ALLOWED_ORIGINS: z.string().min(1),
    ALLOWED_RESOURCES: z.string().nullish(),
    SENTRY_PROJECT: z.string().min(1).nullish(),
    SENTRY_AUTH_TOKEN: z.string().min(1).nullish(),
  },
  client: {
    NEXT_PUBLIC_API_ENDPOINT: z.string().min(1).includes('http'),
    NEXT_PUBLIC_AUTH_METHOD: z.union([
      z.literal('header'),
      z.literal('cookie'),
      z.string().nullish(),
    ]),
    NEXT_PUBLIC_BASE_URL: z.string().min(1).includes('http'),
    NEXT_PUBLIC_ALLOWED_COOKIE_DOMAIN: z.string().min(1),
    NEXT_PUBLIC_SENTRY_DSN: z.string().min(1).includes('http').nullish(),
    NEXT_PUBLIC_DEBUG: z.string().nullish(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
    NEXT_PUBLIC_AUTH_METHOD: process.env.NEXT_PUBLIC_AUTH_METHOD,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
    ALLOWED_RESOURCES: process.env.ALLOWED_RESOURCES,
    NEXT_PUBLIC_ALLOWED_COOKIE_DOMAIN:
      process.env.NEXT_PUBLIC_ALLOWED_COOKIE_DOMAIN,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    SENTRY_PROJECT: process.env.SENTRY_PROJECT,
    SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
    NEXT_PUBLIC_DEBUG: process.env.NEXT_PUBLIC_DEBUG,
  },
});

export { env };
