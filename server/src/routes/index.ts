import { Router } from 'express';
import { router as paypalRouter } from './paypal.js';
import { router as escrowRouter } from './escrow.js';
import { router as auctionRouter } from './auction.js';
import { webhookRouter } from './webhook.js';
import { router as authRouter } from './auth.js';

export const router = Router();

router.use('/auth', authRouter);
router.use('/paypal', paypalRouter);
router.use('/escrow', escrowRouter);
router.use('/auction', auctionRouter);
router.use('/webhooks', webhookRouter);