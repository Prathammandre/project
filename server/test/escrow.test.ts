import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import express from 'express';
import { router as escrowRouter } from '../src/routes/escrow';

const app = express();
app.use(express.json());
app.use('/api/escrow', escrowRouter);

describe('escrow routes', () => {
  it('derives auction hash', async () => {
    const res = await (await import('supertest')).default(app)
      .post('/api/escrow/hash')
      .send({ auctionId: 'a1', seller: 's', buyer: 'b', reserve: '100' });
    expect(res.status).toBe(200);
    expect(res.body.hash).toMatch(/^0x/);
  });
});