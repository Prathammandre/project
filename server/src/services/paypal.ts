import paypal from '@paypal/paypal-server-sdk';
import type { Request } from 'express';

const environment = () => {
  const clientId = process.env.PAYPAL_CLIENT_ID || '';
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET || '';
  if (!clientId || !clientSecret) throw new Error('Missing PayPal credentials');
  const baseUrl = process.env.PAYPAL_BASE_URL || 'https://api-m.sandbox.paypal.com';
  return new paypal.core.LiveEnvironment({ clientId, clientSecret, baseUrl });
};

const client = () => new paypal.core.PayPalHttpClient(environment());

export async function createOrder(params: { amount: string; currency: string; referenceId?: string }) {
  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        reference_id: params.referenceId,
        amount: { currency_code: params.currency, value: params.amount },
      },
    ],
  });
  const response = await client().execute(request);
  return response.result;
}

export async function captureOrder(orderId: string) {
  const request = new paypal.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});
  const response = await client().execute(request);
  return response.result;
}

export async function verifyWebhookSignature(req: Request) {
  // Placeholder: implement verify with PayPal WebhookEvent.verify
  // The SDK v3 server does not yet export a direct helper; verify using HTTP call if needed.
  return true;
}