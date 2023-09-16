/* eslint-disable import/no-unused-modules */
import { NextResponse } from 'next/server';
import { REQUIRE_ENV } from '@utils/helpers';

async function middleware() {
  const missingEnv: string[] = [];

  REQUIRE_ENV.forEach((env) => {
    if (!process.env?.[env]) {
      missingEnv.push(env);
    }
  });

  if (missingEnv.length > 0) {
    return new NextResponse(JSON.stringify({ missingEnv }));
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|common|avatars|top-page).*)',
  ],
};

export default middleware;
