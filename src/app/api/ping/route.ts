import { NextResponse } from 'next/server';

export const runtime = 'edge';

const GET = async () => {
  return NextResponse.json('pong');
};

export { GET };
