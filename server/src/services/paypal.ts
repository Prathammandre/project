import { Client, Environment, OrdersController, type OrderRequest } from '@paypal/paypal-server-sdk';
import type { Request } from 'express';

let cachedClient: Client | null = null;

function getClient(): Client {
  if (cachedClient) return cachedClient;
  const clientId = process.env.PAYPAL_CLIENT_ID || '';
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET || '';
  if (!clientId || !clientSecret) throw new Error('Missing PayPal credentials');
  const env = (process.env.PAYPAL_ENVIRONMENT || 'Sandbox') as keyof typeof Environment;
  cachedClient = new Client({
    environment: Environment[env] ?? Environment.Sandbox,
    clientCredentialsAuthCredentials: {
      oAuthClientId: clientId,
      oAuthClientSecret: clientSecret,
    },
  });
  return cachedClient;
}

export async function createOrder(params: { amount: string; currency: string; referenceId?: string }) {
  const client = getClient();
  const orders = new OrdersController(client);
  const body: OrderRequest = {
    intent: 'CAPTURE',
    purchaseUnits: [
      {
        referenceId: params.referenceId,
        amount: { currencyCode: params.currency, value: params.amount },
      },
    ],
  } as any;
  const response = await orders.createOrder({ body, prefer: 'return=representation' });
  return response.result;
}

export async function captureOrder(orderId: string) {
  const client = getClient();
  const orders = new OrdersController(client);
  const response = await orders.captureOrder({ id: orderId });
  return response.result;
}

export async function verifyWebhookSignature(_req: Request) {
  // TODO: Implement verification using PayPal's Webhook verification endpoint
  return true;
}