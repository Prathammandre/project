import { Router } from 'express';
import { createOrder, captureOrder, verifyWebhookSignature } from '../services/paypal.js';

export const router = Router();

router.post('/orders', async (req, res) => {
  const { amount, currency, referenceId } = req.body as { amount: string; currency?: string; referenceId?: string };
  try {
    const order = await createOrder({ amount, currency: currency || 'USD', referenceId });
    res.json(order);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/orders/:id/capture', async (req, res) => {
  try {
    const result = await captureOrder(req.params.id);
    res.json(result);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/webhook', async (req, res) => {
  try {
    const ok = await verifyWebhookSignature(req);
    if (!ok) return res.status(400).json({ error: 'Invalid signature' });
    // handle event
    res.json({ received: true });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});