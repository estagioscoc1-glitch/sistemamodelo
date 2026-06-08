// Mock PrismaClient before any imports
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      request: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        count: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      student: {
        findFirst: jest.fn(),
      },
    })),
  };
});

import { RequerimentosService } from '../../src/backend/services/requerimentos.service';
import { prisma } from '../../src/backend/services/prisma.service';

const mockedPrisma = prisma as jest.Mocked<typeof prisma>;

describe('RequerimentosService', () => {
  let service: RequerimentosService;
  const tenantId = 'tenant-1';

  beforeEach(() => {
    service = new RequerimentosService();
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('should return paginated requests', async () => {
      const mockRequests = [
        { id: '1', studentId: 's-1', type: 'Segunda Via', status: 'PENDING', tenantId },
      ];
      (mockedPrisma.request.findMany as jest.Mock).mockResolvedValue(mockRequests);
      (mockedPrisma.request.count as jest.Mock).mockResolvedValue(1);

      const result = await service.list(tenantId, { page: 1, limit: 20, skip: 0 });
      expect(result.data).toHaveLength(1);
      expect(result.pagination.total).toBe(1);
    });

    it('should filter by status', async () => {
      (mockedPrisma.request.findMany as jest.Mock).mockResolvedValue([]);
      (mockedPrisma.request.count as jest.Mock).mockResolvedValue(0);

      await service.list(tenantId, { page: 1, limit: 20, skip: 0 }, { status: 'PENDING' });
      expect(mockedPrisma.request.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ status: 'PENDING' }),
        })
      );
    });
  });

  describe('getById', () => {
    it('should return request by id', async () => {
      const mockRequest = {
        id: '1',
        studentId: 's-1',
        type: 'Segunda Via',
        status: 'PENDING',
        tenantId,
      };
      (mockedPrisma.request.findFirst as jest.Mock).mockResolvedValue(mockRequest);

      const result = await service.getById(tenantId, '1');
      expect(result.status).toBe('PENDING');
    });

    it('should throw error if request not found', async () => {
      (mockedPrisma.request.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.getById(tenantId, 'non-existent')).rejects.toThrow(
        'Request not found'
      );
    });
  });

  describe('create', () => {
    it('should create a request with auto-generated protocol', async () => {
      const input = { studentId: 's-1', type: 'Segunda Via', description: 'Test' };
      const mockStudent = { id: 's-1', name: 'Student', tenantId };
      const year = new Date().getFullYear();
      const mockCreated = {
        id: '1',
        ...input,
        protocol: `REQ-${year}-00001`,
        status: 'PENDING',
        tenantId,
      };

      (mockedPrisma.student.findFirst as jest.Mock).mockResolvedValue(mockStudent);
      (mockedPrisma.request.count as jest.Mock).mockResolvedValue(0);
      (mockedPrisma.request.create as jest.Mock).mockResolvedValue(mockCreated);

      const result = await service.create(tenantId, input);
      expect(result.protocol).toBe(`REQ-${year}-00001`);
      expect(result.status).toBe('PENDING');
    });

    it('should throw error if student not found', async () => {
      (mockedPrisma.student.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(
        service.create(tenantId, { studentId: 'invalid', type: 'Segunda Via' })
      ).rejects.toThrow('Student not found');
    });
  });

  describe('update', () => {
    it('should update a request', async () => {
      const existing = { id: '1', type: 'Segunda Via', status: 'PENDING', tenantId };
      const updated = { id: '1', type: 'Trancamento', status: 'PENDING', tenantId };

      (mockedPrisma.request.findFirst as jest.Mock).mockResolvedValue(existing);
      (mockedPrisma.request.update as jest.Mock).mockResolvedValue(updated);

      const result = await service.update(tenantId, '1', { type: 'Trancamento' });
      expect(result.type).toBe('Trancamento');
    });

    it('should throw error if request not found', async () => {
      (mockedPrisma.request.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.update(tenantId, 'invalid', { type: 'X' })).rejects.toThrow(
        'Request not found'
      );
    });
  });

  describe('updateStatus', () => {
    it('should update request status with response', async () => {
      const existing = { id: '1', status: 'PENDING', tenantId };
      const updated = { id: '1', status: 'APPROVED', response: 'Approved', tenantId };

      (mockedPrisma.request.findFirst as jest.Mock).mockResolvedValue(existing);
      (mockedPrisma.request.update as jest.Mock).mockResolvedValue(updated);

      const result = await service.updateStatus(tenantId, '1', 'APPROVED', 'Approved');
      expect(result.status).toBe('APPROVED');
    });

    it('should throw error if request not found', async () => {
      (mockedPrisma.request.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.updateStatus(tenantId, 'invalid', 'APPROVED')).rejects.toThrow(
        'Request not found'
      );
    });
  });
});
