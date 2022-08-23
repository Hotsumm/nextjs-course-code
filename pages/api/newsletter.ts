import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email }: any = req.body;
    console.log(email);

    res.status(201).json({ message: '등록 성공' });
  }
}
