// Mock PrismaClient before any imports
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      grade: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        count: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        updateMany: jest.fn(),
        createMany: jest.fn(),
      },
    })),
  };
});

import { NotasService } from '../../src/backend/services/notas.service';
import { prisma } from '../../src/backend/services/prisma.service';

const mockedPrisma = prisma as jest.Mocked<typeof prisma>;

describe('NotasService', () => {
  let service: NotasService;
  const tenantId = 'tenant-1';

  beforeEach(() => {
    service = new NotasService();
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('should return paginated grades', async () => {
      const mockGrades = [
        { id: '1', studentId: 's-1', classId: 'c-1', disciplineId: 'd-1', value: 8.5, tenantId },
      ];
      (mockedPrisma.grade.findMany as jest.Mock).mockResolvedValue(mockGrades);
      (mockedPrisma.grade.count as jest.Mock).mockResolvedValue(1);

      const result = await service.list(tenantId, { page: 1, limit: 20, skip: 0 });
      expect(result.data).toHaveLength(1);
      expect(result.pagination.total).toBe(1);
    });

    it('should apply filters when provided', async () => {
      (mockedPrisma.grade.findMany as jest.Mock).mockResolvedValue([]);
      (mockedPrisma.grade.count as jest.Mock).mockResolvedValue(0);

      await service.list(tenantId, { page: 1, limit: 20, skip: 0 }, { classId: 'c-1', period: 1 });
      expect(mockedPrisma.grade.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ classId: 'c-1', period: 1 }),
        })
      );
    });
  });

  describe('getById', () => {
    it('should return grade by id', async () => {
      const mockGrade = {
        id: '1',
        studentId: 's-1',
        classId: 'c-1',
        disciplineId: 'd-1',
        value: 8.5,
        tenantId,
      };
      (mockedPrisma.grade.findFirst as jest.Mock).mockResolvedValue(mockGrade);

      const result = await service.getById(tenantId, '1');
      expect(result.value).toBe(8.5);
    });

    it('should throw error if grade not found', async () => {
      (mockedPrisma.grade.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.getById(tenantId, 'non-existent')).rejects.toThrow(
        'Grade not found'
      );
    });
  });

  describe('create', () => {
    it('should create a grade', async () => {
      const input = { studentId: 's-1', classId: 'c-1', disciplineId: 'd-1', value: 8.5 };
      const mockCreated = { id: '1', ...input, tenantId };

      (mockedPrisma.grade.create as jest.Mock).mockResolvedValue(mockCreated);

      const result = await service.create(tenantId, input);
      expect(result.value).toBe(8.5);
    });
  });

  describe('update', () => {
    it('should update a grade', async () => {
      const existing = { id: '1', studentId: 's-1', value: 7.0, tenantId };
      const updated = { id: '1', studentId: 's-1', value: 9.0, tenantId };

      (mockedPrisma.grade.findFirst as jest.Mock).mockResolvedValue(existing);
      (mockedPrisma.grade.update as jest.Mock).mockResolvedValue(updated);

      const result = await service.update(tenantId, '1', { value: 9.0 });
      expect(result.value).toBe(9.0);
    });

    it('should throw error if grade not found', async () => {
      (mockedPrisma.grade.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.update(tenantId, 'non-existent', { value: 9.0 })).rejects.toThrow(
        'Grade not found'
      );
    });
  });

  describe('bulkCreate', () => {
    it('should create multiple grades', async () => {
      const grades = [
        { studentId: 's-1', classId: 'c-1', disciplineId: 'd-1', value: 8.0 },
        { studentId: 's-2', classId: 'c-1', disciplineId: 'd-1', value: 7.5 },
      ];

      (mockedPrisma.grade.createMany as jest.Mock).mockResolvedValue({ count: 2 });

      const result = await service.bulkCreate(tenantId, grades);
      expect(result.count).toBe(2);
    });
  });

  describe('getStudentReport', () => {
    it('should return all grades for a student', async () => {
      const mockGrades = [
        { id: '1', studentId: 's-1', disciplineId: 'd-1', value: 8.5, period: 1 },
        { id: '2', studentId: 's-1', disciplineId: 'd-2', value: 7.0, period: 1 },
      ];
      (mockedPrisma.grade.findMany as jest.Mock).mockResolvedValue(mockGrades);

      const result = await service.getStudentReport(tenantId, 's-1');
      expect(result).toHaveLength(2);
    });
  });

  describe('close', () => {
    it('should close grades for a period', async () => {
      (mockedPrisma.grade.updateMany as jest.Mock).mockResolvedValue({ count: 5 });

      const result = await service.close(tenantId, 'c-1', 'd-1', 1);
      expect(result.updated).toBe(5);
    });
  });
});
