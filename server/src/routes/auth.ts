import { Router } from 'express';

export const router = Router();

router.post('/admin/login', (req, res) => {
  const { password } = req.body as { password: string };
  if (!process.env.ADMIN_PASSWORD) return res.status(500).json({ error: 'ADMIN_PASSWORD not set' });
  if (password !== process.env.ADMIN_PASSWORD) return res.status(401).json({ error: 'Invalid' });
  res.json({ token: 'ok' });
});