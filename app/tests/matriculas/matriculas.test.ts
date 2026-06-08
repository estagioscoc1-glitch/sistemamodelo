// Mock PrismaClient before any imports
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      enrollment: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        count: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      student: {
        findFirst: jest.fn(),
      },
      course: {
        findFirst: jest.fn(),
      },
    })),
  };
});

import { MatriculasService } from '../../src/backend/services/matriculas.service';
import { prisma } from '../../src/backend/services/prisma.service';

const mockedPrisma = prisma as jest.Mocked<typeof prisma>;

describe('MatriculasService', () => {
  let service: MatriculasService;
  const tenantId = 'tenant-1';

  beforeEach(() => {
    service = new MatriculasService();
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('should return paginated enrollments', async () => {
      const mockEnrollments = [
        { id: '1', studentId: 's-1', courseId: 'c-1', status: 'ACTIVE', tenantId },
      ];
      (mockedPrisma.enrollment.findMany as jest.Mock).mockResolvedValue(mockEnrollments);
      (mockedPrisma.enrollment.count as jest.Mock).mockResolvedValue(1);

      const result = await service.list(tenantId, { page: 1, limit: 20, skip: 0 });
      expect(result.data).toHaveLength(1);
      expect(result.pagination.total).toBe(1);
    });
  });

  describe('getById', () => {
    it('should return enrollment by id', async () => {
      const mockEnrollment = {
        id: '1',
        studentId: 's-1',
        courseId: 'c-1',
        status: 'ACTIVE',
        tenantId,
      };
      (mockedPrisma.enrollment.findFirst as jest.Mock).mockResolvedValue(mockEnrollment);

      const result = await service.getById(tenantId, '1');
      expect(result.status).toBe('ACTIVE');
    });

    it('should throw error if enrollment not found', async () => {
      (mockedPrisma.enrollment.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.getById(tenantId, 'non-existent')).rejects.toThrow(
        'Enrollment not found'
      );
    });
  });

  describe('create', () => {
    it('should create an enrollment', async () => {
      const input = { studentId: 's-1', courseId: 'c-1' };
      const mockStudent = { id: 's-1', name: 'Student', tenantId };
      const mockCourse = { id: 'c-1', name: 'Course', tenantId };
      const mockCreated = { id: '1', ...input, status: 'ACTIVE', tenantId };

      (mockedPrisma.student.findFirst as jest.Mock).mockResolvedValue(mockStudent);
      (mockedPrisma.course.findFirst as jest.Mock).mockResolvedValue(mockCourse);
      (mockedPrisma.enrollment.create as jest.Mock).mockResolvedValue(mockCreated);

      const result = await service.create(tenantId, input);
      expect(result.status).toBe('ACTIVE');
    });

    it('should throw error if student not found', async () => {
      (mockedPrisma.student.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(
        service.create(tenantId, { studentId: 'invalid', courseId: 'c-1' })
      ).rejects.toThrow('Student not found');
    });

    it('should throw error if course not found', async () => {
      const mockStudent = { id: 's-1', name: 'Student', tenantId };
      (mockedPrisma.student.findFirst as jest.Mock).mockResolvedValue(mockStudent);
      (mockedPrisma.course.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(
        service.create(tenantId, { studentId: 's-1', courseId: 'invalid' })
      ).rejects.toThrow('Course not found');
    });
  });

  describe('renew', () => {
    it('should renew an active enrollment', async () => {
      const existing = { id: '1', status: 'ACTIVE', tenantId };
      const renewed = { id: '1', status: 'RENEWED', tenantId };

      (mockedPrisma.enrollment.findFirst as jest.Mock).mockResolvedValue(existing);
      (mockedPrisma.enrollment.update as jest.Mock).mockResolvedValue(renewed);

      const result = await service.renew(tenantId, '1');
      expect(result.status).toBe('RENEWED');
    });

    it('should throw error if enrollment not active or completed', async () => {
      const existing = { id: '1', status: 'CANCELLED', tenantId };
      (mockedPrisma.enrollment.findFirst as jest.Mock).mockResolvedValue(existing);

      await expect(service.renew(tenantId, '1')).rejects.toThrow(
        'Only active or completed enrollments can be renewed'
      );
    });
  });

  describe('transfer', () => {
    it('should transfer an active enrollment', async () => {
      const existing = { id: '1', status: 'ACTIVE', classId: 'class-1', tenantId };
      const transferred = { id: '1', status: 'TRANSFERRED', classId: 'class-2', tenantId };

      (mockedPrisma.enrollment.findFirst as jest.Mock).mockResolvedValue(existing);
      (mockedPrisma.enrollment.update as jest.Mock).mockResolvedValue(transferred);

      const result = await service.transfer(tenantId, '1', 'class-2');
      expect(result.status).toBe('TRANSFERRED');
    });

    it('should throw error if enrollment not active', async () => {
      const existing = { id: '1', status: 'SUSPENDED', tenantId };
      (mockedPrisma.enrollment.findFirst as jest.Mock).mockResolvedValue(existing);

      await expect(service.transfer(tenantId, '1')).rejects.toThrow(
        'Only active enrollments can be transferred'
      );
    });
  });

  describe('cancel', () => {
    it('should cancel an active enrollment', async () => {
      const existing = { id: '1', status: 'ACTIVE', tenantId };
      const cancelled = { id: '1', status: 'CANCELLED', tenantId };

      (mockedPrisma.enrollment.findFirst as jest.Mock).mockResolvedValue(existing);
      (mockedPrisma.enrollment.update as jest.Mock).mockResolvedValue(cancelled);

      const result = await service.cancel(tenantId, '1', 'Student request');
      expect(result.status).toBe('CANCELLED');
    });

    it('should throw error if already cancelled', async () => {
      const existing = { id: '1', status: 'CANCELLED', tenantId };
      (mockedPrisma.enrollment.findFirst as jest.Mock).mockResolvedValue(existing);

      await expect(service.cancel(tenantId, '1')).rejects.toThrow(
        'Enrollment is already cancelled'
      );
    });
  });

  describe('suspend', () => {
    it('should suspend an active enrollment', async () => {
      const existing = { id: '1', status: 'ACTIVE', tenantId };
      const suspended = { id: '1', status: 'SUSPENDED', tenantId };

      (mockedPrisma.enrollment.findFirst as jest.Mock).mockResolvedValue(existing);
      (mockedPrisma.enrollment.update as jest.Mock).mockResolvedValue(suspended);

      const result = await service.suspend(tenantId, '1', 'Personal reasons');
      expect(result.status).toBe('SUSPENDED');
    });

    it('should throw error if enrollment not active', async () => {
      const existing = { id: '1', status: 'CANCELLED', tenantId };
      (mockedPrisma.enrollment.findFirst as jest.Mock).mockResolvedValue(existing);

      await expect(service.suspend(tenantId, '1')).rejects.toThrow(
        'Only active enrollments can be suspended'
      );
    });
  });
});
