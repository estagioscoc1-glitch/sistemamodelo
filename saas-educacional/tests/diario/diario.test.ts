// Mock PrismaClient before any imports
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      diaryEntry: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        count: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      attendance: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        count: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        createMany: jest.fn(),
      },
    })),
  };
});

import { DiarioService } from '../../src/backend/services/diario.service';
import { prisma } from '../../src/backend/services/prisma.service';

const mockedPrisma = prisma as jest.Mocked<typeof prisma>;

describe('DiarioService', () => {
  let service: DiarioService;
  const tenantId = 'tenant-1';

  beforeEach(() => {
    service = new DiarioService();
    jest.clearAllMocks();
  });

  describe('listEntries', () => {
    it('should return paginated diary entries', async () => {
      const mockEntries = [
        { id: '1', classId: 'c-1', disciplineId: 'd-1', type: 'CONTENT', date: new Date(), tenantId },
      ];
      (mockedPrisma.diaryEntry.findMany as jest.Mock).mockResolvedValue(mockEntries);
      (mockedPrisma.diaryEntry.count as jest.Mock).mockResolvedValue(1);

      const result = await service.listEntries(tenantId, { page: 1, limit: 20, skip: 0 });
      expect(result.data).toHaveLength(1);
      expect(result.pagination.total).toBe(1);
    });

    it('should apply filters when provided', async () => {
      (mockedPrisma.diaryEntry.findMany as jest.Mock).mockResolvedValue([]);
      (mockedPrisma.diaryEntry.count as jest.Mock).mockResolvedValue(0);

      await service.listEntries(tenantId, { page: 1, limit: 20, skip: 0 }, { classId: 'c-1', type: 'ATTENDANCE' });
      expect(mockedPrisma.diaryEntry.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ classId: 'c-1', type: 'ATTENDANCE' }),
        })
      );
    });
  });

  describe('createEntry', () => {
    it('should create a diary entry', async () => {
      const input = {
        classId: 'c-1',
        disciplineId: 'd-1',
        date: new Date('2024-03-15'),
        type: 'CONTENT' as const,
        topic: 'Algebra',
      };
      const mockCreated = { id: '1', ...input, tenantId };

      (mockedPrisma.diaryEntry.create as jest.Mock).mockResolvedValue(mockCreated);

      const result = await service.createEntry(tenantId, input);
      expect(result.topic).toBe('Algebra');
    });
  });

  describe('getEntryById', () => {
    it('should return entry by id', async () => {
      const mockEntry = { id: '1', classId: 'c-1', disciplineId: 'd-1', type: 'CONTENT', tenantId };
      (mockedPrisma.diaryEntry.findFirst as jest.Mock).mockResolvedValue(mockEntry);

      const result = await service.getEntryById(tenantId, '1');
      expect(result.type).toBe('CONTENT');
    });

    it('should throw error if entry not found', async () => {
      (mockedPrisma.diaryEntry.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.getEntryById(tenantId, 'non-existent')).rejects.toThrow(
        'Diary entry not found'
      );
    });
  });

  describe('listAttendance', () => {
    it('should return paginated attendance records', async () => {
      const mockRecords = [
        { id: '1', studentId: 's-1', classId: 'c-1', disciplineId: 'd-1', present: true, tenantId },
      ];
      (mockedPrisma.attendance.findMany as jest.Mock).mockResolvedValue(mockRecords);
      (mockedPrisma.attendance.count as jest.Mock).mockResolvedValue(1);

      const result = await service.listAttendance(tenantId, { page: 1, limit: 20, skip: 0 });
      expect(result.data).toHaveLength(1);
      expect(result.pagination.total).toBe(1);
    });
  });

  describe('bulkCreateAttendance', () => {
    it('should create multiple attendance records', async () => {
      const records = [
        { studentId: 's-1', classId: 'c-1', disciplineId: 'd-1', date: new Date(), present: true },
        { studentId: 's-2', classId: 'c-1', disciplineId: 'd-1', date: new Date(), present: false },
      ];

      (mockedPrisma.attendance.createMany as jest.Mock).mockResolvedValue({ count: 2 });

      const result = await service.bulkCreateAttendance(tenantId, records);
      expect(result.count).toBe(2);
    });
  });

  describe('getFrequencyReport', () => {
    it('should return frequency statistics for a student', async () => {
      const mockRecords = [
        { id: '1', studentId: 's-1', present: true, justified: false },
        { id: '2', studentId: 's-1', present: true, justified: false },
        { id: '3', studentId: 's-1', present: false, justified: true },
        { id: '4', studentId: 's-1', present: false, justified: false },
      ];
      (mockedPrisma.attendance.findMany as jest.Mock).mockResolvedValue(mockRecords);

      const result = await service.getFrequencyReport(tenantId, 's-1');
      expect(result.total).toBe(4);
      expect(result.present).toBe(2);
      expect(result.absent).toBe(2);
      expect(result.justified).toBe(1);
    });
  });
});
