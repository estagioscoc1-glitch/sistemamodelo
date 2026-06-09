import { prisma } from './prisma.service';
import { AppError } from '../middleware/errorHandler';
import { PaginationParams, buildPaginatedResponse, PaginatedResponse } from '../utils/pagination';

// ==========================================
// COURSES SERVICE
// ==========================================

export interface CourseInput {
  name: string;
  code?: string;
  description?: string;
  duration?: number;
  modality?: string;
  unitId?: string;
}

export class CursosService {
  async list(tenantId: string, params: PaginationParams): Promise<PaginatedResponse<unknown>> {
    const where = { tenantId, deletedAt: null };
    const [data, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip: params.skip,
        take: params.limit,
        orderBy: { name: 'asc' },
      }),
      prisma.course.count({ where }),
    ]);
    return buildPaginatedResponse(data, total, params);
  }

  async getById(tenantId: string, id: string) {
    const course = await prisma.course.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { classes: true },
    });
    if (!course) throw new AppError('Course not found', 404);
    return course;
  }

  async create(tenantId: string, input: CourseInput) {
    return prisma.course.create({
      data: { ...input, tenantId },
    });
  }

  async update(tenantId: string, id: string, input: Partial<CourseInput>) {
    const existing = await prisma.course.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!existing) throw new AppError('Course not found', 404);

    return prisma.course.update({
      where: { id },
      data: input,
    });
  }

  async delete(tenantId: string, id: string) {
    const existing = await prisma.course.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!existing) throw new AppError('Course not found', 404);

    return prisma.course.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

// ==========================================
// CLASSES SERVICE
// ==========================================

export interface ClassInput {
  name: string;
  code?: string;
  courseId: string;
  unitId?: string;
  year: number;
  semester?: number;
  shift?: string;
  maxStudents?: number;
}

export class TurmasService {
  async list(tenantId: string, params: PaginationParams): Promise<PaginatedResponse<unknown>> {
    const where = { tenantId, deletedAt: null };
    const [data, total] = await Promise.all([
      prisma.class.findMany({
        where,
        skip: params.skip,
        take: params.limit,
        orderBy: { name: 'asc' },
        include: { course: true },
      }),
      prisma.class.count({ where }),
    ]);
    return buildPaginatedResponse(data, total, params);
  }

  async getById(tenantId: string, id: string) {
    const classItem = await prisma.class.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { course: true, enrollments: true },
    });
    if (!classItem) throw new AppError('Class not found', 404);
    return classItem;
  }

  async create(tenantId: string, input: ClassInput) {
    return prisma.class.create({
      data: { ...input, tenantId },
    });
  }

  async update(tenantId: string, id: string, input: Partial<ClassInput>) {
    const existing = await prisma.class.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!existing) throw new AppError('Class not found', 404);

    return prisma.class.update({
      where: { id },
      data: input,
    });
  }

  async delete(tenantId: string, id: string) {
    const existing = await prisma.class.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!existing) throw new AppError('Class not found', 404);

    return prisma.class.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

// ==========================================
// STUDENTS SERVICE
// ==========================================

export interface StudentInput {
  name: string;
  email?: string;
  phone?: string;
  cpf?: string;
  rg?: string;
  birthDate?: Date;
  gender?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  motherName?: string;
  fatherName?: string;
  guardianName?: string;
  guardianPhone?: string;
  registration?: string;
}

export class AlunosService {
  async list(tenantId: string, params: PaginationParams): Promise<PaginatedResponse<unknown>> {
    const where = { tenantId, deletedAt: null };
    const [data, total] = await Promise.all([
      prisma.student.findMany({
        where,
        skip: params.skip,
        take: params.limit,
        orderBy: { name: 'asc' },
      }),
      prisma.student.count({ where }),
    ]);
    return buildPaginatedResponse(data, total, params);
  }

  async getById(tenantId: string, id: string) {
    const student = await prisma.student.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { enrollments: true },
    });
    if (!student) throw new AppError('Student not found', 404);
    return student;
  }

  async create(tenantId: string, input: StudentInput) {
    return prisma.student.create({
      data: { ...input, tenantId },
    });
  }

  async update(tenantId: string, id: string, input: Partial<StudentInput>) {
    const existing = await prisma.student.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!existing) throw new AppError('Student not found', 404);

    return prisma.student.update({
      where: { id },
      data: input,
    });
  }

  async delete(tenantId: string, id: string) {
    const existing = await prisma.student.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!existing) throw new AppError('Student not found', 404);

    return prisma.student.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}

export const cursosService = new CursosService();
export const turmasService = new TurmasService();
export const alunosService = new AlunosService();
