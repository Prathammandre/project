import { describe, it, expect } from 'vitest';
import { createOrder } from '../src/services/paypal';

describe('paypal service', () => {
  it('throws when credentials are missing', async () => {
    await expect(createOrder({ amount: '1.00', currency: 'USD' })).rejects.toThrow();
  });
});