/* eslint-disable import/no-unused-modules */
import { NextResponse } from 'next/server';

const runtime = 'edge';

export async function GET() {
  return NextResponse.json({ message: 'Hello, World!' });
}

export { runtime };
