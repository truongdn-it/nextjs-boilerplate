/* eslint-disable import/no-unused-modules */
import type { NextApiRequest, NextApiResponse } from 'next';
import { MOCK_TASKS } from '@/mocks';

type ResponseData = {
  data: any[];
};

export default function handler(
  _: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  res.status(200).json({ data: MOCK_TASKS });
}
