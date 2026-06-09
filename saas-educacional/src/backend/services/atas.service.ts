import { prisma } from './prisma.service';
import { AppError } from '../middleware/errorHandler';
import { PaginationParams, buildPaginatedResponse, PaginatedResponse } from '../utils/pagination';

export interface MinutesInput {
  title: string;
  date: Date | string;
  type?: string;
  content?: string;
  participants?: string;
}

export class AtasService {
  async list(tenantId: string, params: PaginationParams, filters?: { type?: string; status?: string; startDate?: string; endDate?: string }): Promise<PaginatedResponse<unknown>> {
    const where: Record<string, unknown> = { tenantId, deletedAt: null };
    if (filters?.type) where.type = filters.type;
    if (filters?.status) where.status = filters.status;
    if (filters?.startDate || filters?.endDate) {
      const dateFilter: Record<string, Date> = {};
      if (filters.startDate) dateFilter.gte = new Date(filters.startDate);
      if (filters.endDate) dateFilter.lte = new Date(filters.endDate);
      where.date = dateFilter;
    }

    const [data, total] = await Promise.all([
      prisma.minutes.findMany({
        where,
        skip: params.skip,
        take: params.limit,
        orderBy: { date: 'desc' },
      }),
      prisma.minutes.count({ where }),
    ]);
    return buildPaginatedResponse(data, total, params);
  }

  async getById(tenantId: string, id: string) {
    const minutes = await prisma.minutes.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!minutes) throw new AppError('Minutes not found', 404);
    return minutes;
  }

  async create(tenantId: string, input: MinutesInput) {
    return prisma.minutes.create({
      data: {
        tenantId,
        title: input.title,
        date: new Date(input.date),
        type: input.type || null,
        content: input.content || null,
        participants: input.participants || null,
        status: 'DRAFT',
      },
    });
  }

  async update(tenantId: string, id: string, input: Partial<MinutesInput>) {
    const existing = await prisma.minutes.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!existing) throw new AppError('Minutes not found', 404);

    const data: Record<string, unknown> = { ...input };
    if (input.date) data.date = new Date(input.date);

    return prisma.minutes.update({
      where: { id },
      data,
    });
  }

  async updateStatus(tenantId: string, id: string, status: string) {
    const existing = await prisma.minutes.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!existing) throw new AppError('Minutes not found', 404);

    const validStatuses = ['DRAFT', 'APPROVED', 'PUBLISHED'];
    if (!validStatuses.includes(status)) {
      throw new AppError('Invalid status. Must be DRAFT, APPROVED, or PUBLISHED', 400);
    }

    return prisma.minutes.update({
      where: { id },
      data: { status },
    });
  }

  async duplicate(tenantId: string, id: string) {
    const existing = await prisma.minutes.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!existing) throw new AppError('Minutes not found', 404);

    return prisma.minutes.create({
      data: {
        tenantId,
        title: `${existing.title} (Copia)`,
        date: existing.date,
        type: existing.type,
        content: existing.content,
        participants: existing.participants,
        status: 'DRAFT',
      },
    });
  }
}

export const atasService = new AtasService();
