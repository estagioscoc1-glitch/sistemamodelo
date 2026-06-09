// Mock PrismaClient before any imports
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      internship: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        count: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
      internshipCompany: {
        findMany: jest.fn(),
        findFirst: jest.fn(),
        count: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
    })),
  };
});

import { EstagiosService } from '../../src/backend/services/estagios.service';
import { prisma } from '../../src/backend/services/prisma.service';

const mockedPrisma = prisma as jest.Mocked<typeof prisma>;

describe('EstagiosService', () => {
  let service: EstagiosService;
  const tenantId = 'tenant-1';

  beforeEach(() => {
    service = new EstagiosService();
    jest.clearAllMocks();
  });

  describe('listInternships', () => {
    it('should return paginated internships', async () => {
      const mockInternships = [
        { id: '1', studentId: 's-1', companyId: 'c-1', status: 'ACTIVE', tenantId },
      ];
      (mockedPrisma.internship.findMany as jest.Mock).mockResolvedValue(mockInternships);
      (mockedPrisma.internship.count as jest.Mock).mockResolvedValue(1);

      const result = await service.listInternships(tenantId, { page: 1, limit: 20, skip: 0 });
      expect(result.data).toHaveLength(1);
      expect(result.pagination.total).toBe(1);
    });

    it('should filter by studentId', async () => {
      (mockedPrisma.internship.findMany as jest.Mock).mockResolvedValue([]);
      (mockedPrisma.internship.count as jest.Mock).mockResolvedValue(0);

      await service.listInternships(tenantId, { page: 1, limit: 20, skip: 0 }, { studentId: 's-1' });
      expect(mockedPrisma.internship.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ studentId: 's-1' }),
        })
      );
    });
  });

  describe('getInternshipById', () => {
    it('should return internship by id', async () => {
      const mockInternship = {
        id: '1',
        studentId: 's-1',
        companyId: 'c-1',
        status: 'ACTIVE',
        tenantId,
      };
      (mockedPrisma.internship.findFirst as jest.Mock).mockResolvedValue(mockInternship);

      const result = await service.getInternshipById(tenantId, '1');
      expect(result.status).toBe('ACTIVE');
    });

    it('should throw error if internship not found', async () => {
      (mockedPrisma.internship.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.getInternshipById(tenantId, 'non-existent')).rejects.toThrow(
        'Internship not found'
      );
    });
  });

  describe('createInternship', () => {
    it('should create an internship', async () => {
      const input = { studentId: 's-1', companyId: 'c-1', workload: 30 };
      const mockCreated = { id: '1', ...input, status: 'ACTIVE', tenantId };

      (mockedPrisma.internship.create as jest.Mock).mockResolvedValue(mockCreated);

      const result = await service.createInternship(tenantId, input);
      expect(result.status).toBe('ACTIVE');
    });

    it('should throw error if studentId is missing', async () => {
      await expect(
        service.createInternship(tenantId, { studentId: '' })
      ).rejects.toThrow('studentId is required');
    });
  });

  describe('updateInternship', () => {
    it('should update an internship', async () => {
      const existing = { id: '1', status: 'ACTIVE', tenantId };
      const updated = { id: '1', status: 'ACTIVE', supervisor: 'New Supervisor', tenantId };

      (mockedPrisma.internship.findFirst as jest.Mock).mockResolvedValue(existing);
      (mockedPrisma.internship.update as jest.Mock).mockResolvedValue(updated);

      const result = await service.updateInternship(tenantId, '1', { supervisor: 'New Supervisor' });
      expect(result.supervisor).toBe('New Supervisor');
    });

    it('should throw error if internship not found', async () => {
      (mockedPrisma.internship.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(
        service.updateInternship(tenantId, 'non-existent', { supervisor: 'Test' })
      ).rejects.toThrow('Internship not found');
    });
  });

  describe('listCompanies', () => {
    it('should return paginated companies', async () => {
      const mockCompanies = [
        { id: '1', name: 'TechCorp', tenantId, isActive: true },
      ];
      (mockedPrisma.internshipCompany.findMany as jest.Mock).mockResolvedValue(mockCompanies);
      (mockedPrisma.internshipCompany.count as jest.Mock).mockResolvedValue(1);

      const result = await service.listCompanies(tenantId, { page: 1, limit: 20, skip: 0 });
      expect(result.data).toHaveLength(1);
      expect(result.pagination.total).toBe(1);
    });
  });

  describe('createCompany', () => {
    it('should create a company', async () => {
      const input = { name: 'TechCorp', cnpj: '12.345.678/0001-90', city: 'SP' };
      const mockCreated = { id: '1', ...input, tenantId, isActive: true };

      (mockedPrisma.internshipCompany.create as jest.Mock).mockResolvedValue(mockCreated);

      const result = await service.createCompany(tenantId, input);
      expect(result.name).toBe('TechCorp');
      expect(result.isActive).toBe(true);
    });

    it('should throw error if name is missing', async () => {
      await expect(
        service.createCompany(tenantId, { name: '' })
      ).rejects.toThrow('name is required');
    });
  });

  describe('getCompanyById', () => {
    it('should return company by id', async () => {
      const mockCompany = { id: '1', name: 'TechCorp', tenantId, isActive: true };
      (mockedPrisma.internshipCompany.findFirst as jest.Mock).mockResolvedValue(mockCompany);

      const result = await service.getCompanyById(tenantId, '1');
      expect(result.name).toBe('TechCorp');
    });

    it('should throw error if company not found', async () => {
      (mockedPrisma.internshipCompany.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(service.getCompanyById(tenantId, 'non-existent')).rejects.toThrow(
        'Company not found'
      );
    });
  });
});
