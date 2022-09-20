import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { commentData } = req.body;
  if (req.method === 'POST') {
    const newComment = {
      id: new Date().toISOString(),
      text: commentData.text,
      name: commentData.name,
    };
    res.status(201).json({ newComment });
  }

  if (req.method === 'GET') {
    const commentList = [
      { id: 'c1', text: 'My comment is amazing!', name: 'Maximilian' },
      { id: 'c2', text: 'Hello!', name: 'Hotsumm' },
      { id: 'c3', text: 'I am Levi', name: 'Levi' },
    ];

    res.status(201).json({ commentList });
  }
}
