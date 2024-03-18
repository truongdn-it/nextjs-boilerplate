'use server';

import 'server-only';

import { revalidateTag } from 'next/cache';
import { API_ROUTES } from '@/utils/constants';

const refetchGetMock = () => {
  revalidateTag(API_ROUTES.GET_MOCK);
};

export { refetchGetMock };
