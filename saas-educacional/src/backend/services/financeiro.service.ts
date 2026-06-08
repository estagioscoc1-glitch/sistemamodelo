import { prisma } from './prisma.service';
import { AppError } from '../middleware/errorHandler';
import { PaginationParams, buildPaginatedResponse, PaginatedResponse } from '../utils/pagination';

export interface AccountInput {
  studentId: string;
  description?: string;
  totalAmount: number;
  dueDate?: Date;
}

export interface PaymentInput {
  accountId: string;
  installment: number;
  amount: number;
  dueDate: Date;
}

export interface PaymentUpdateInput {
  paidDate?: Date;
  paidAmount?: number;
  status?: 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';
}

export class FinanceiroService {
  async listAccounts(
    tenantId: string,
    params: PaginationParams,
    filters?: { studentId?: string; status?: string }
  ): Promise<PaginatedResponse<unknown>> {
    const where: Record<string, unknown> = { tenantId, deletedAt: null };
    if (filters?.studentId) where.studentId = filters.studentId;
    if (filters?.status) where.status = filters.status;

    const [data, total] = await Promise.all([
      prisma.financialAccount.findMany({
        where,
        skip: params.skip,
        take: params.limit,
        orderBy: { createdAt: 'desc' },
        include: { student: true, payments: true },
      }),
      prisma.financialAccount.count({ where }),
    ]);
    return buildPaginatedResponse(data, total, params);
  }

  async getAccountById(tenantId: string, id: string) {
    const account = await prisma.financialAccount.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { student: true, payments: true },
    });
    if (!account) throw new AppError('Account not found', 404);
    return account;
  }

  async createAccount(tenantId: string, input: AccountInput) {
    if (!input.studentId) throw new AppError('studentId is required', 400);
    if (!input.totalAmount) throw new AppError('totalAmount is required', 400);

    return prisma.financialAccount.create({
      data: {
        ...input,
        tenantId,
        status: 'OPEN',
      },
      include: { student: true },
    });
  }

  async updateAccount(tenantId: string, id: string, input: Partial<AccountInput>) {
    const existing = await prisma.financialAccount.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!existing) throw new AppError('Account not found', 404);

    return prisma.financialAccount.update({
      where: { id },
      data: input,
    });
  }

  async listPayments(
    tenantId: string,
    params: PaginationParams,
    filters?: { accountId?: string; status?: string; dueDateStart?: Date; dueDateEnd?: Date }
  ): Promise<PaginatedResponse<unknown>> {
    const where: Record<string, unknown> = { tenantId, deletedAt: null };
    if (filters?.accountId) where.accountId = filters.accountId;
    if (filters?.status) where.status = filters.status;
    if (filters?.dueDateStart || filters?.dueDateEnd) {
      const dueDate: Record<string, Date> = {};
      if (filters.dueDateStart) dueDate.gte = filters.dueDateStart;
      if (filters.dueDateEnd) dueDate.lte = filters.dueDateEnd;
      where.dueDate = dueDate;
    }

    const [data, total] = await Promise.all([
      prisma.financialPayment.findMany({
        where,
        skip: params.skip,
        take: params.limit,
        orderBy: { dueDate: 'asc' },
        include: { account: true },
      }),
      prisma.financialPayment.count({ where }),
    ]);
    return buildPaginatedResponse(data, total, params);
  }

  async getPaymentById(tenantId: string, id: string) {
    const payment = await prisma.financialPayment.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { account: true },
    });
    if (!payment) throw new AppError('Payment not found', 404);
    return payment;
  }

  async createPayment(tenantId: string, input: PaymentInput) {
    if (!input.accountId) throw new AppError('accountId is required', 400);

    return prisma.financialPayment.create({
      data: {
        ...input,
        tenantId,
        status: 'PENDING',
      },
      include: { account: true },
    });
  }

  async updatePayment(tenantId: string, id: string, input: PaymentUpdateInput) {
    const existing = await prisma.financialPayment.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!existing) throw new AppError('Payment not found', 404);

    return prisma.financialPayment.update({
      where: { id },
      data: input,
    });
  }

  async bulkCreatePayments(tenantId: string, accountId: string, installments: number, amount: number, startDate: Date) {
    const account = await prisma.financialAccount.findFirst({
      where: { id: accountId, tenantId, deletedAt: null },
    });
    if (!account) throw new AppError('Account not found', 404);

    const payments: Array<{
      tenantId: string;
      accountId: string;
      installment: number;
      amount: number;
      dueDate: Date;
      status: 'PENDING';
    }> = [];
    for (let i = 1; i <= installments; i++) {
      const dueDate = new Date(startDate);
      dueDate.setMonth(dueDate.getMonth() + (i - 1));
      payments.push({
        tenantId,
        accountId,
        installment: i,
        amount,
        dueDate,
        status: 'PENDING',
      });
    }

    const created = await prisma.financialPayment.createMany({
      data: payments,
    });

    return created;
  }

  async getOverdueReport(tenantId: string) {
    const overduePayments = await prisma.financialPayment.findMany({
      where: {
        tenantId,
        deletedAt: null,
        status: 'OVERDUE',
      },
      include: { account: true },
      orderBy: { dueDate: 'asc' },
    });

    return {
      total: overduePayments.length,
      payments: overduePayments,
    };
  }

  async getCashFlow(tenantId: string) {
    const payments = await prisma.financialPayment.findMany({
      where: {
        tenantId,
        deletedAt: null,
      },
      orderBy: { dueDate: 'asc' },
    });

    const summary = {
      totalReceivable: 0,
      totalReceived: 0,
      totalOverdue: 0,
    };

    for (const payment of payments) {
      if (payment.status === 'PAID') {
        summary.totalReceived += payment.paidAmount || payment.amount;
      } else if (payment.status === 'OVERDUE') {
        summary.totalOverdue += payment.amount;
      } else if (payment.status === 'PENDING') {
        summary.totalReceivable += payment.amount;
      }
    }

    return summary;
  }
}

export const financeiroService = new FinanceiroService();
