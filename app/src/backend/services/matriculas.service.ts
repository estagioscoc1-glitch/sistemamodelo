import { prisma } from './prisma.service';
import { AppError } from '../middleware/errorHandler';
import { PaginationParams, buildPaginatedResponse, PaginatedResponse } from '../utils/pagination';

export interface EnrollmentInput {
  studentId: string;
  courseId: string;
  classId?: string;
  code?: string;
  startDate?: Date;
  endDate?: Date;
  observation?: string;
}

export class MatriculasService {
  async list(tenantId: string, params: PaginationParams): Promise<PaginatedResponse<unknown>> {
    const where = { tenantId, deletedAt: null };
    const [data, total] = await Promise.all([
      prisma.enrollment.findMany({
        where,
        skip: params.skip,
        take: params.limit,
        orderBy: { enrollDate: 'desc' },
        include: { student: true, course: true, class: true },
      }),
      prisma.enrollment.count({ where }),
    ]);
    return buildPaginatedResponse(data, total, params);
  }

  async getById(tenantId: string, id: string) {
    const enrollment = await prisma.enrollment.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { student: true, course: true, class: true },
    });
    if (!enrollment) throw new AppError('Enrollment not found', 404);
    return enrollment;
  }

  async create(tenantId: string, input: EnrollmentInput) {
    // Verify student exists
    const student = await prisma.student.findFirst({
      where: { id: input.studentId, tenantId, deletedAt: null },
    });
    if (!student) throw new AppError('Student not found', 404);

    // Verify course exists
    const course = await prisma.course.findFirst({
      where: { id: input.courseId, tenantId, deletedAt: null },
    });
    if (!course) throw new AppError('Course not found', 404);

    return prisma.enrollment.create({
      data: {
        ...input,
        tenantId,
        status: 'ACTIVE',
      },
      include: { student: true, course: true },
    });
  }

  async update(tenantId: string, id: string, input: Partial<EnrollmentInput>) {
    const existing = await prisma.enrollment.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!existing) throw new AppError('Enrollment not found', 404);

    return prisma.enrollment.update({
      where: { id },
      data: input,
    });
  }

  async renew(tenantId: string, id: string) {
    const existing = await prisma.enrollment.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!existing) throw new AppError('Enrollment not found', 404);

    if (existing.status !== 'ACTIVE' && existing.status !== 'COMPLETED') {
      throw new AppError('Only active or completed enrollments can be renewed', 400);
    }

    return prisma.enrollment.update({
      where: { id },
      data: {
        status: 'RENEWED',
        observation: `Renewed on ${new Date().toISOString()}`,
      },
    });
  }

  async transfer(tenantId: string, id: string, targetClassId?: string) {
    const existing = await prisma.enrollment.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!existing) throw new AppError('Enrollment not found', 404);

    if (existing.status !== 'ACTIVE') {
      throw new AppError('Only active enrollments can be transferred', 400);
    }

    return prisma.enrollment.update({
      where: { id },
      data: {
        status: 'TRANSFERRED',
        classId: targetClassId || existing.classId,
        observation: `Transferred on ${new Date().toISOString()}`,
      },
    });
  }

  async cancel(tenantId: string, id: string, reason?: string) {
    const existing = await prisma.enrollment.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!existing) throw new AppError('Enrollment not found', 404);

    if (existing.status === 'CANCELLED') {
      throw new AppError('Enrollment is already cancelled', 400);
    }

    return prisma.enrollment.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        observation: reason || `Cancelled on ${new Date().toISOString()}`,
      },
    });
  }

  async suspend(tenantId: string, id: string, reason?: string) {
    const existing = await prisma.enrollment.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!existing) throw new AppError('Enrollment not found', 404);

    if (existing.status !== 'ACTIVE') {
      throw new AppError('Only active enrollments can be suspended', 400);
    }

    return prisma.enrollment.update({
      where: { id },
      data: {
        status: 'SUSPENDED',
        observation: reason || `Suspended on ${new Date().toISOString()}`,
      },
    });
  }
}

export const matriculasService = new MatriculasService();
