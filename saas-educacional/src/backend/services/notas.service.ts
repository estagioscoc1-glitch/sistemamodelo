import { prisma } from './prisma.service';
import { AppError } from '../middleware/errorHandler';
import { PaginationParams, buildPaginatedResponse, PaginatedResponse } from '../utils/pagination';

export interface GradeInput {
  studentId: string;
  classId: string;
  disciplineId: string;
  evaluation?: string;
  value?: number;
  weight?: number;
  recovery?: number;
  finalGrade?: number;
  status?: string;
  period?: number;
  year?: number;
}

export interface GradeFilter {
  classId?: string;
  disciplineId?: string;
  studentId?: string;
  period?: number;
  year?: number;
}

export class NotasService {
  async list(tenantId: string, params: PaginationParams, filter?: GradeFilter): Promise<PaginatedResponse<unknown>> {
    const where: Record<string, unknown> = { tenantId, deletedAt: null };
    if (filter?.classId) where.classId = filter.classId;
    if (filter?.disciplineId) where.disciplineId = filter.disciplineId;
    if (filter?.studentId) where.studentId = filter.studentId;
    if (filter?.period) where.period = filter.period;
    if (filter?.year) where.year = filter.year;

    const [data, total] = await Promise.all([
      prisma.grade.findMany({
        where,
        skip: params.skip,
        take: params.limit,
        orderBy: { createdAt: 'desc' },
        include: { student: true, class: true, discipline: true },
      }),
      prisma.grade.count({ where }),
    ]);
    return buildPaginatedResponse(data, total, params);
  }

  async getById(tenantId: string, id: string) {
    const grade = await prisma.grade.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { student: true, class: true, discipline: true },
    });
    if (!grade) throw new AppError('Grade not found', 404);
    return grade;
  }

  async create(tenantId: string, input: GradeInput) {
    return prisma.grade.create({
      data: {
        ...input,
        tenantId,
      },
      include: { student: true, class: true, discipline: true },
    });
  }

  async update(tenantId: string, id: string, input: Partial<GradeInput>) {
    const existing = await prisma.grade.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!existing) throw new AppError('Grade not found', 404);

    return prisma.grade.update({
      where: { id },
      data: input,
    });
  }

  async bulkCreate(tenantId: string, grades: GradeInput[]) {
    const data = grades.map((g) => ({ ...g, tenantId }));
    const result = await prisma.grade.createMany({ data });
    return { count: result.count };
  }

  async getStudentReport(tenantId: string, studentId: string) {
    const grades = await prisma.grade.findMany({
      where: { tenantId, studentId, deletedAt: null },
      include: { discipline: true, class: true },
      orderBy: [{ year: 'desc' }, { period: 'asc' }],
    });
    return grades;
  }

  async getAverages(tenantId: string, filter?: GradeFilter) {
    const where: Record<string, unknown> = { tenantId, deletedAt: null };
    if (filter?.classId) where.classId = filter.classId;
    if (filter?.disciplineId) where.disciplineId = filter.disciplineId;
    if (filter?.period) where.period = filter.period;
    if (filter?.year) where.year = filter.year;

    const grades = await prisma.grade.findMany({
      where,
      include: { student: true, discipline: true },
    });
    return grades;
  }

  async close(tenantId: string, classId: string, disciplineId: string, period: number) {
    const result = await prisma.grade.updateMany({
      where: { tenantId, classId, disciplineId, period, deletedAt: null },
      data: { status: 'CLOSED' },
    });
    return { updated: result.count };
  }
}

export const notasService = new NotasService();
