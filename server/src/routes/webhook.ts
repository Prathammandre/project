import { Router } from 'express';

export const webhookRouter = Router();

function verifyWebhookToken(req: any, res: any, next: any) {
  const token = req.header('X-Webhook-Token');
  if (!process.env.WEBHOOK_TOKEN) return res.status(500).json({ error: 'WEBHOOK_TOKEN not set' });
  if (token !== process.env.WEBHOOK_TOKEN) return res.status(403).json({ error: 'Forbidden' });
  next();
}

webhookRouter.post('/:provider', verifyWebhookToken, async (req, res) => {
  const { provider } = req.params;
  // TODO: dispatch to provider-specific handlers (paypal, crypto)
  res.json({ received: true, provider });
});