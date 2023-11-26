/* eslint-disable import/no-unused-modules */
import { NextResponse } from 'next/server';
import { MOCK_TASKS } from '@/mocks';

export async function GET() {
  return NextResponse.json({ data: MOCK_TASKS });
}
