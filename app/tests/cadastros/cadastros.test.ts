// Mock PrismaClient before any imports
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      course: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        count: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      class: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        count: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      student: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        count: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
    })),
  };
});

import { CursosService, TurmasService, AlunosService } from '../../src/backend/services/cadastros.service';
import { prisma } from '../../src/backend/services/prisma.service';

const mockedPrisma = prisma as jest.Mocked<typeof prisma>;

describe('CursosService', () => {
  let service: CursosService;
  const tenantId = 'tenant-1';

  beforeEach(() => {
    service = new CursosService();
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('should return paginated courses', async () => {
      const mockCourses = [
        { id: '1', name: 'Course A', tenantId },
        { id: '2', name: 'Course B', tenantId },
      ];

      (mockedPrisma.course.findMany as jest.Mock).mockResolvedValue(mockCourses);
      (mockedPrisma.course.count as jest.Mock).mockResolvedValue(2);

      const result = await service.list(tenantId, { page: 1, limit: 20, skip: 0 });

      expect(result.data).toHaveLength(2);
      expect(result.pagination.total).toBe(2);
      expect(result.pagination.page).toBe(1);
    });
  });

  describe('getById', () => {
    it('should return a course by id', async () => {
      const mockCourse = { id: '1', name: 'Course A', tenantId, classes: [] };
      (mockedPrisma.course.findFirst as jest.Mock).mockResolvedValue(mockCourse);

      const result = await service.getById(tenantId, '1');
      expect(result.name).toBe('Course A');
    });

    it('should throw error if course not found', async () => {
      (mockedPrisma.course.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.getById(tenantId, 'non-existent')).rejects.toThrow(
        'Course not found'
      );
    });
  });

  describe('create', () => {
    it('should create a course', async () => {
      const input = { name: 'New Course', code: 'NC01' };
      const mockCreated = { id: '3', ...input, tenantId };

      (mockedPrisma.course.create as jest.Mock).mockResolvedValue(mockCreated);

      const result = await service.create(tenantId, input);
      expect(result.name).toBe('New Course');
      expect(mockedPrisma.course.create).toHaveBeenCalledWith({
        data: { ...input, tenantId },
      });
    });
  });

  describe('update', () => {
    it('should update a course', async () => {
      const existing = { id: '1', name: 'Old Name', tenantId };
      const updated = { id: '1', name: 'New Name', tenantId };

      (mockedPrisma.course.findFirst as jest.Mock).mockResolvedValue(existing);
      (mockedPrisma.course.update as jest.Mock).mockResolvedValue(updated);

      const result = await service.update(tenantId, '1', { name: 'New Name' });
      expect(result.name).toBe('New Name');
    });

    it('should throw error if course not found for update', async () => {
      (mockedPrisma.course.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(
        service.update(tenantId, 'non-existent', { name: 'X' })
      ).rejects.toThrow('Course not found');
    });
  });

  describe('delete', () => {
    it('should soft delete a course', async () => {
      const existing = { id: '1', name: 'Course', tenantId };
      (mockedPrisma.course.findFirst as jest.Mock).mockResolvedValue(existing);
      (mockedPrisma.course.update as jest.Mock).mockResolvedValue({
        ...existing,
        deletedAt: new Date(),
      });

      await service.delete(tenantId, '1');
      expect(mockedPrisma.course.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { deletedAt: expect.any(Date) },
      });
    });
  });
});

describe('TurmasService', () => {
  let service: TurmasService;
  const tenantId = 'tenant-1';

  beforeEach(() => {
    service = new TurmasService();
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('should return paginated classes', async () => {
      const mockClasses = [{ id: '1', name: 'Class A', tenantId }];
      (mockedPrisma.class.findMany as jest.Mock).mockResolvedValue(mockClasses);
      (mockedPrisma.class.count as jest.Mock).mockResolvedValue(1);

      const result = await service.list(tenantId, { page: 1, limit: 20, skip: 0 });
      expect(result.data).toHaveLength(1);
    });
  });

  describe('create', () => {
    it('should create a class', async () => {
      const input = { name: 'Class A', courseId: 'course-1', year: 2024 };
      const mockCreated = { id: '1', ...input, tenantId };

      (mockedPrisma.class.create as jest.Mock).mockResolvedValue(mockCreated);

      const result = await service.create(tenantId, input);
      expect(result.name).toBe('Class A');
    });
  });
});

describe('AlunosService', () => {
  let service: AlunosService;
  const tenantId = 'tenant-1';

  beforeEach(() => {
    service = new AlunosService();
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('should return paginated students', async () => {
      const mockStudents = [{ id: '1', name: 'Student A', tenantId }];
      (mockedPrisma.student.findMany as jest.Mock).mockResolvedValue(mockStudents);
      (mockedPrisma.student.count as jest.Mock).mockResolvedValue(1);

      const result = await service.list(tenantId, { page: 1, limit: 20, skip: 0 });
      expect(result.data).toHaveLength(1);
    });
  });

  describe('create', () => {
    it('should create a student', async () => {
      const input = { name: 'Student A', email: 'student@test.com' };
      const mockCreated = { id: '1', ...input, tenantId };

      (mockedPrisma.student.create as jest.Mock).mockResolvedValue(mockCreated);

      const result = await service.create(tenantId, input);
      expect(result.name).toBe('Student A');
    });
  });

  describe('getById', () => {
    it('should throw error if student not found', async () => {
      (mockedPrisma.student.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.getById(tenantId, 'non-existent')).rejects.toThrow(
        'Student not found'
      );
    });
  });
});
