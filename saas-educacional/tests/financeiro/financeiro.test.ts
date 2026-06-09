// Mock PrismaClient before any imports
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      financialAccount: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        count: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      financialPayment: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        count: jest.fn(),
        create: jest.fn(),
        createMany: jest.fn(),
        update: jest.fn(),
      },
    })),
  };
});

import { FinanceiroService } from '../../src/backend/services/financeiro.service';
import { prisma } from '../../src/backend/services/prisma.service';

const mockedPrisma = prisma as jest.Mocked<typeof prisma>;

describe('FinanceiroService', () => {
  let service: FinanceiroService;
  const tenantId = 'tenant-1';

  beforeEach(() => {
    service = new FinanceiroService();
    jest.clearAllMocks();
  });

  describe('listAccounts', () => {
    it('should return paginated accounts', async () => {
      const mockAccounts = [
        { id: '1', studentId: 's-1', totalAmount: 1200, status: 'OPEN', tenantId },
      ];
      (mockedPrisma.financialAccount.findMany as jest.Mock).mockResolvedValue(mockAccounts);
      (mockedPrisma.financialAccount.count as jest.Mock).mockResolvedValue(1);

      const result = await service.listAccounts(tenantId, { page: 1, limit: 20, skip: 0 });
      expect(result.data).toHaveLength(1);
      expect(result.pagination.total).toBe(1);
    });

    it('should filter by status', async () => {
      (mockedPrisma.financialAccount.findMany as jest.Mock).mockResolvedValue([]);
      (mockedPrisma.financialAccount.count as jest.Mock).mockResolvedValue(0);

      await service.listAccounts(tenantId, { page: 1, limit: 20, skip: 0 }, { status: 'OPEN' });
      expect(mockedPrisma.financialAccount.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ status: 'OPEN' }),
        })
      );
    });
  });

  describe('getAccountById', () => {
    it('should return account by id', async () => {
      const mockAccount = {
        id: '1',
        studentId: 's-1',
        totalAmount: 1200,
        status: 'OPEN',
        tenantId,
      };
      (mockedPrisma.financialAccount.findFirst as jest.Mock).mockResolvedValue(mockAccount);

      const result = await service.getAccountById(tenantId, '1');
      expect(result.status).toBe('OPEN');
    });

    it('should throw error if account not found', async () => {
      (mockedPrisma.financialAccount.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.getAccountById(tenantId, 'non-existent')).rejects.toThrow(
        'Account not found'
      );
    });
  });

  describe('createAccount', () => {
    it('should create an account', async () => {
      const input = { studentId: 's-1', totalAmount: 1200, description: 'Mensalidade' };
      const mockCreated = { id: '1', ...input, status: 'OPEN', tenantId };

      (mockedPrisma.financialAccount.create as jest.Mock).mockResolvedValue(mockCreated);

      const result = await service.createAccount(tenantId, input);
      expect(result.status).toBe('OPEN');
    });

    it('should throw error if studentId is missing', async () => {
      await expect(
        service.createAccount(tenantId, { studentId: '', totalAmount: 1200 })
      ).rejects.toThrow('studentId is required');
    });

    it('should throw error if totalAmount is missing', async () => {
      await expect(
        service.createAccount(tenantId, { studentId: 's-1', totalAmount: 0 })
      ).rejects.toThrow('totalAmount is required');
    });
  });

  describe('listPayments', () => {
    it('should return paginated payments', async () => {
      const mockPayments = [
        { id: '1', accountId: 'a-1', installment: 1, amount: 200, status: 'PENDING', tenantId },
      ];
      (mockedPrisma.financialPayment.findMany as jest.Mock).mockResolvedValue(mockPayments);
      (mockedPrisma.financialPayment.count as jest.Mock).mockResolvedValue(1);

      const result = await service.listPayments(tenantId, { page: 1, limit: 20, skip: 0 });
      expect(result.data).toHaveLength(1);
      expect(result.pagination.total).toBe(1);
    });

    it('should filter by accountId', async () => {
      (mockedPrisma.financialPayment.findMany as jest.Mock).mockResolvedValue([]);
      (mockedPrisma.financialPayment.count as jest.Mock).mockResolvedValue(0);

      await service.listPayments(tenantId, { page: 1, limit: 20, skip: 0 }, { accountId: 'a-1' });
      expect(mockedPrisma.financialPayment.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ accountId: 'a-1' }),
        })
      );
    });
  });

  describe('createPayment', () => {
    it('should create a payment', async () => {
      const input = { accountId: 'a-1', installment: 1, amount: 200, dueDate: new Date('2024-03-10') };
      const mockCreated = { id: '1', ...input, status: 'PENDING', tenantId };

      (mockedPrisma.financialPayment.create as jest.Mock).mockResolvedValue(mockCreated);

      const result = await service.createPayment(tenantId, input);
      expect(result.status).toBe('PENDING');
    });

    it('should throw error if accountId is missing', async () => {
      await expect(
        service.createPayment(tenantId, { accountId: '', installment: 1, amount: 200, dueDate: new Date() })
      ).rejects.toThrow('accountId is required');
    });
  });

  describe('bulkCreatePayments', () => {
    it('should bulk create payments for an account', async () => {
      const mockAccount = { id: 'a-1', studentId: 's-1', totalAmount: 1200, tenantId };
      (mockedPrisma.financialAccount.findFirst as jest.Mock).mockResolvedValue(mockAccount);
      (mockedPrisma.financialPayment.createMany as jest.Mock).mockResolvedValue({ count: 6 });

      const result = await service.bulkCreatePayments(tenantId, 'a-1', 6, 200, new Date('2024-01-10'));
      expect(result.count).toBe(6);
    });

    it('should throw error if account not found', async () => {
      (mockedPrisma.financialAccount.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(
        service.bulkCreatePayments(tenantId, 'non-existent', 6, 200, new Date())
      ).rejects.toThrow('Account not found');
    });
  });

  describe('getOverdueReport', () => {
    it('should return overdue payments', async () => {
      const mockOverdue = [
        { id: '1', accountId: 'a-1', amount: 200, status: 'OVERDUE', tenantId },
        { id: '2', accountId: 'a-2', amount: 150, status: 'OVERDUE', tenantId },
      ];
      (mockedPrisma.financialPayment.findMany as jest.Mock).mockResolvedValue(mockOverdue);

      const result = await service.getOverdueReport(tenantId);
      expect(result.total).toBe(2);
      expect(result.payments).toHaveLength(2);
    });
  });
});
