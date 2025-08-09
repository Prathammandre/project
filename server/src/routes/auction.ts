import { Router } from 'express';
import { getStreamKey, startStream, stopStream } from '../services/auctionStream.js';

export const router = Router();

router.get('/:auctionId/stream-key', async (req, res) => {
  const key = await getStreamKey(req.params.auctionId);
  res.json({ streamKey: key });
});

router.post('/:auctionId/start', async (req, res) => {
  await startStream(req.params.auctionId);
  res.json({ started: true });
});

router.post('/:auctionId/stop', async (req, res) => {
  await stopStream(req.params.auctionId);
  res.json({ stopped: true });
});