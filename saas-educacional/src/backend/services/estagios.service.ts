import { prisma } from './prisma.service';
import { AppError } from '../middleware/errorHandler';
import { PaginationParams, buildPaginatedResponse, PaginatedResponse } from '../utils/pagination';

export interface InternshipInput {
  studentId: string;
  companyId?: string;
  startDate?: Date;
  endDate?: Date;
  workload?: number;
  supervisor?: string;
  observation?: string;
}

export interface CompanyInput {
  name: string;
  cnpj?: string;
  address?: string;
  city?: string;
  state?: string;
  phone?: string;
  email?: string;
  contactName?: string;
}

export class EstagiosService {
  async listInternships(
    tenantId: string,
    params: PaginationParams,
    filters?: { studentId?: string; status?: string; companyId?: string }
  ): Promise<PaginatedResponse<unknown>> {
    const where: Record<string, unknown> = { tenantId, deletedAt: null };
    if (filters?.studentId) where.studentId = filters.studentId;
    if (filters?.status) where.status = filters.status;
    if (filters?.companyId) where.companyId = filters.companyId;

    const [data, total] = await Promise.all([
      prisma.internship.findMany({
        where,
        skip: params.skip,
        take: params.limit,
        orderBy: { createdAt: 'desc' },
        include: { student: true, company: true },
      }),
      prisma.internship.count({ where }),
    ]);
    return buildPaginatedResponse(data, total, params);
  }

  async getInternshipById(tenantId: string, id: string) {
    const internship = await prisma.internship.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { student: true, company: true },
    });
    if (!internship) throw new AppError('Internship not found', 404);
    return internship;
  }

  async createInternship(tenantId: string, input: InternshipInput) {
    if (!input.studentId) throw new AppError('studentId is required', 400);

    return prisma.internship.create({
      data: {
        ...input,
        tenantId,
        status: 'ACTIVE',
      },
      include: { student: true, company: true },
    });
  }

  async updateInternship(tenantId: string, id: string, input: Partial<InternshipInput>) {
    const existing = await prisma.internship.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!existing) throw new AppError('Internship not found', 404);

    return prisma.internship.update({
      where: { id },
      data: input,
    });
  }

  async listCompanies(tenantId: string, params: PaginationParams): Promise<PaginatedResponse<unknown>> {
    const where = { tenantId, deletedAt: null };
    const [data, total] = await Promise.all([
      prisma.internshipCompany.findMany({
        where,
        skip: params.skip,
        take: params.limit,
        orderBy: { name: 'asc' },
      }),
      prisma.internshipCompany.count({ where }),
    ]);
    return buildPaginatedResponse(data, total, params);
  }

  async getCompanyById(tenantId: string, id: string) {
    const company = await prisma.internshipCompany.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!company) throw new AppError('Company not found', 404);
    return company;
  }

  async createCompany(tenantId: string, input: CompanyInput) {
    if (!input.name) throw new AppError('name is required', 400);

    return prisma.internshipCompany.create({
      data: {
        ...input,
        tenantId,
        isActive: true,
      },
    });
  }

  async updateCompany(tenantId: string, id: string, input: Partial<CompanyInput>) {
    const existing = await prisma.internshipCompany.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!existing) throw new AppError('Company not found', 404);

    return prisma.internshipCompany.update({
      where: { id },
      data: input,
    });
  }
}

export const estagiosService = new EstagiosService();
