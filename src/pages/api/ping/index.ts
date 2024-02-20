import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  status: string;
};

export default function handler(
  _: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  res.status(200).json({ status: 'healthy' });
}
