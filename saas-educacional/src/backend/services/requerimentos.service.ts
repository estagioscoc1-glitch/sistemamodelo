import { prisma } from './prisma.service';
import { AppError } from '../middleware/errorHandler';
import { PaginationParams, buildPaginatedResponse, PaginatedResponse } from '../utils/pagination';

export interface RequestInput {
  studentId: string;
  type: string;
  description?: string;
}

export class RequerimentosService {
  async list(tenantId: string, params: PaginationParams, filters?: { studentId?: string; status?: string; type?: string }): Promise<PaginatedResponse<unknown>> {
    const where: Record<string, unknown> = { tenantId, deletedAt: null };
    if (filters?.studentId) where.studentId = filters.studentId;
    if (filters?.status) where.status = filters.status;
    if (filters?.type) where.type = filters.type;

    const [data, total] = await Promise.all([
      prisma.request.findMany({
        where,
        skip: params.skip,
        take: params.limit,
        orderBy: { requestDate: 'desc' },
        include: { student: true },
      }),
      prisma.request.count({ where }),
    ]);
    return buildPaginatedResponse(data, total, params);
  }

  async getById(tenantId: string, id: string) {
    const request = await prisma.request.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { student: true },
    });
    if (!request) throw new AppError('Request not found', 404);
    return request;
  }

  async create(tenantId: string, input: RequestInput) {
    const student = await prisma.student.findFirst({
      where: { id: input.studentId, tenantId, deletedAt: null },
    });
    if (!student) throw new AppError('Student not found', 404);

    const year = new Date().getFullYear();
    const count = await prisma.request.count({ where: { tenantId } });
    const protocol = `REQ-${year}-${String(count + 1).padStart(5, '0')}`;

    return prisma.request.create({
      data: {
        tenantId,
        studentId: input.studentId,
        type: input.type,
        description: input.description || null,
        protocol,
        status: 'PENDING',
        requestDate: new Date(),
      },
      include: { student: true },
    });
  }

  async update(tenantId: string, id: string, input: Partial<RequestInput>) {
    const existing = await prisma.request.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!existing) throw new AppError('Request not found', 404);

    return prisma.request.update({
      where: { id },
      data: input,
    });
  }

  async updateStatus(tenantId: string, id: string, status: string, response?: string) {
    const existing = await prisma.request.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!existing) throw new AppError('Request not found', 404);

    const data: Record<string, unknown> = { status };
    if (response !== undefined) data.response = response;
    if (status === 'APPROVED' || status === 'REJECTED' || status === 'COMPLETED') {
      data.responseDate = new Date();
    }

    return prisma.request.update({
      where: { id },
      data,
    });
  }

  async listByStudent(tenantId: string, studentId: string) {
    return prisma.request.findMany({
      where: { tenantId, studentId, deletedAt: null },
      orderBy: { requestDate: 'desc' },
    });
  }
}

export const requerimentosService = new RequerimentosService();
