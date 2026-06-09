// Mock PrismaClient before any imports
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      minutes: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        count: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
    })),
  };
});

import { AtasService } from '../../src/backend/services/atas.service';
import { prisma } from '../../src/backend/services/prisma.service';

const mockedPrisma = prisma as jest.Mocked<typeof prisma>;

describe('AtasService', () => {
  let service: AtasService;
  const tenantId = 'tenant-1';

  beforeEach(() => {
    service = new AtasService();
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('should return paginated minutes', async () => {
      const mockMinutes = [
        { id: '1', title: 'Reuniao', type: 'Conselho', status: 'DRAFT', tenantId },
      ];
      (mockedPrisma.minutes.findMany as jest.Mock).mockResolvedValue(mockMinutes);
      (mockedPrisma.minutes.count as jest.Mock).mockResolvedValue(1);

      const result = await service.list(tenantId, { page: 1, limit: 20, skip: 0 });
      expect(result.data).toHaveLength(1);
      expect(result.pagination.total).toBe(1);
    });

    it('should filter by type', async () => {
      (mockedPrisma.minutes.findMany as jest.Mock).mockResolvedValue([]);
      (mockedPrisma.minutes.count as jest.Mock).mockResolvedValue(0);

      await service.list(tenantId, { page: 1, limit: 20, skip: 0 }, { type: 'Conselho' });
      expect(mockedPrisma.minutes.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ type: 'Conselho' }),
        })
      );
    });
  });

  describe('getById', () => {
    it('should return minutes by id', async () => {
      const mockMinutes = {
        id: '1',
        title: 'Reuniao',
        type: 'Conselho',
        status: 'DRAFT',
        tenantId,
      };
      (mockedPrisma.minutes.findFirst as jest.Mock).mockResolvedValue(mockMinutes);

      const result = await service.getById(tenantId, '1');
      expect(result.status).toBe('DRAFT');
    });

    it('should throw error if minutes not found', async () => {
      (mockedPrisma.minutes.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.getById(tenantId, 'non-existent')).rejects.toThrow(
        'Minutes not found'
      );
    });
  });

  describe('create', () => {
    it('should create minutes', async () => {
      const input = { title: 'Reuniao', date: '2024-03-05', type: 'Conselho', content: 'Content', participants: 'Prof. A' };
      const mockCreated = {
        id: '1',
        ...input,
        date: new Date('2024-03-05'),
        status: 'DRAFT',
        tenantId,
      };

      (mockedPrisma.minutes.create as jest.Mock).mockResolvedValue(mockCreated);

      const result = await service.create(tenantId, input);
      expect(result.status).toBe('DRAFT');
      expect(result.title).toBe('Reuniao');
    });
  });

  describe('update', () => {
    it('should update minutes', async () => {
      const existing = { id: '1', title: 'Reuniao', status: 'DRAFT', tenantId };
      const updated = { id: '1', title: 'Reuniao Atualizada', status: 'DRAFT', tenantId };

      (mockedPrisma.minutes.findFirst as jest.Mock).mockResolvedValue(existing);
      (mockedPrisma.minutes.update as jest.Mock).mockResolvedValue(updated);

      const result = await service.update(tenantId, '1', { title: 'Reuniao Atualizada' });
      expect(result.title).toBe('Reuniao Atualizada');
    });

    it('should throw error if minutes not found', async () => {
      (mockedPrisma.minutes.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.update(tenantId, 'invalid', { title: 'X' })).rejects.toThrow(
        'Minutes not found'
      );
    });
  });

  describe('updateStatus', () => {
    it('should update minutes status', async () => {
      const existing = { id: '1', status: 'DRAFT', tenantId };
      const updated = { id: '1', status: 'APPROVED', tenantId };

      (mockedPrisma.minutes.findFirst as jest.Mock).mockResolvedValue(existing);
      (mockedPrisma.minutes.update as jest.Mock).mockResolvedValue(updated);

      const result = await service.updateStatus(tenantId, '1', 'APPROVED');
      expect(result.status).toBe('APPROVED');
    });

    it('should throw error for invalid status', async () => {
      const existing = { id: '1', status: 'DRAFT', tenantId };
      (mockedPrisma.minutes.findFirst as jest.Mock).mockResolvedValue(existing);

      await expect(service.updateStatus(tenantId, '1', 'INVALID')).rejects.toThrow(
        'Invalid status. Must be DRAFT, APPROVED, or PUBLISHED'
      );
    });

    it('should throw error if minutes not found', async () => {
      (mockedPrisma.minutes.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.updateStatus(tenantId, 'invalid', 'APPROVED')).rejects.toThrow(
        'Minutes not found'
      );
    });
  });

  describe('duplicate', () => {
    it('should duplicate minutes with DRAFT status', async () => {
      const existing = {
        id: '1',
        title: 'Reuniao',
        date: new Date('2024-03-05'),
        type: 'Conselho',
        content: 'Content',
        participants: 'Prof. A',
        status: 'APPROVED',
        tenantId,
      };
      const duplicated = {
        id: '2',
        title: 'Reuniao (Copia)',
        date: new Date('2024-03-05'),
        type: 'Conselho',
        content: 'Content',
        participants: 'Prof. A',
        status: 'DRAFT',
        tenantId,
      };

      (mockedPrisma.minutes.findFirst as jest.Mock).mockResolvedValue(existing);
      (mockedPrisma.minutes.create as jest.Mock).mockResolvedValue(duplicated);

      const result = await service.duplicate(tenantId, '1');
      expect(result.title).toBe('Reuniao (Copia)');
      expect(result.status).toBe('DRAFT');
    });

    it('should throw error if minutes not found', async () => {
      (mockedPrisma.minutes.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.duplicate(tenantId, 'invalid')).rejects.toThrow(
        'Minutes not found'
      );
    });
  });
});
