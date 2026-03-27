import cron from 'node-cron';
import { prisma } from '../services/prisma.js';

export function startEscrowSettlementJob() {
  cron.schedule('*/10 * * * *', async () => {
    // Placeholder: release or refund based on auction status
    await prisma.escrowDeposit.updateMany({ where: { status: 'HELD' }, data: { status: 'RELEASED' } });
  });
}