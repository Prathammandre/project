import { Router } from 'express';
import { keccak256, toUtf8Bytes } from 'ethers';
import { prisma } from '../services/prisma.js';
import { requireAdmin } from '../middleware/adminAuth.js';

export const router = Router();

router.post('/hash', (req, res) => {
  const { auctionId, seller, buyer, reserve } = req.body as { auctionId: string; seller: string; buyer: string; reserve: string };
  const input = `${auctionId}:${seller}:${buyer}:${reserve}`;
  const hash = keccak256(toUtf8Bytes(input));
  res.json({ hash });
});

router.post('/deposit', async (req, res) => {
  const { txHash, auctionId, amount, chainId } = req.body as { txHash: string; auctionId: string; amount: string; chainId: number };
  try {
    const record = await prisma.escrowDeposit.create({ data: { txHash, auctionId, amount, chainId } });
    res.json(record);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/release', requireAdmin, async (req, res) => {
  const { auctionId } = req.body as { auctionId: string };
  try {
    const result = await prisma.escrowDeposit.updateMany({ where: { auctionId, status: 'HELD' }, data: { status: 'RELEASED' } });
    res.json({ updated: result.count });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/refund', requireAdmin, async (req, res) => {
  const { auctionId } = req.body as { auctionId: string };
  try {
    const result = await prisma.escrowDeposit.updateMany({ where: { auctionId, status: 'HELD' }, data: { status: 'REFUNDED' } });
    res.json({ updated: result.count });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});