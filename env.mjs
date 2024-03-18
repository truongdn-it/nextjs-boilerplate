import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const env = createEnv({
  server: {
    // DATABASE_URL: z.string().url(),
    // OPEN_AI_API_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_API_ENDPOINT: z.string().min(1).includes('http'),
    NEXT_PUBLIC_AUTH_METHOD: z.union([
      z.literal('header'),
      z.literal('cookie'),
      z.string().nullish(),
    ]),
    NEXT_PUBLIC_BASE_URL: z.string().min(1).includes('http'),
    NEXT_PUBLIC_NODE_ENV: z.union([
      z.literal('development'),
      z.literal('production'),
      z.string().nullish(),
    ]),
  },
  runtimeEnv: {
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
    NEXT_PUBLIC_AUTH_METHOD: process.env.NEXT_PUBLIC_AUTH_METHOD,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});

export { env };
