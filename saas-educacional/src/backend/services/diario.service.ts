import { prisma } from './prisma.service';
import { AppError } from '../middleware/errorHandler';
import { PaginationParams, buildPaginatedResponse, PaginatedResponse } from '../utils/pagination';

export interface DiaryEntryInput {
  classId: string;
  disciplineId: string;
  date: Date;
  type: 'ATTENDANCE' | 'GRADES' | 'CONTENT';
  content?: string;
  topic?: string;
  observations?: string;
}

export interface AttendanceInput {
  studentId: string;
  classId: string;
  disciplineId: string;
  date: Date;
  present?: boolean;
  justified?: boolean;
  observation?: string;
}

export interface DiaryEntryFilter {
  classId?: string;
  disciplineId?: string;
  type?: string;
  date?: Date;
}

export interface AttendanceFilter {
  classId?: string;
  disciplineId?: string;
  date?: Date;
  studentId?: string;
}

export class DiarioService {
  async listEntries(tenantId: string, params: PaginationParams, filter?: DiaryEntryFilter): Promise<PaginatedResponse<unknown>> {
    const where: Record<string, unknown> = { tenantId, deletedAt: null };
    if (filter?.classId) where.classId = filter.classId;
    if (filter?.disciplineId) where.disciplineId = filter.disciplineId;
    if (filter?.type) where.type = filter.type;
    if (filter?.date) where.date = filter.date;

    const [data, total] = await Promise.all([
      prisma.diaryEntry.findMany({
        where,
        skip: params.skip,
        take: params.limit,
        orderBy: { date: 'desc' },
        include: { class: true, discipline: true },
      }),
      prisma.diaryEntry.count({ where }),
    ]);
    return buildPaginatedResponse(data, total, params);
  }

  async getEntryById(tenantId: string, id: string) {
    const entry = await prisma.diaryEntry.findFirst({
      where: { id, tenantId, deletedAt: null },
      include: { class: true, discipline: true },
    });
    if (!entry) throw new AppError('Diary entry not found', 404);
    return entry;
  }

  async createEntry(tenantId: string, input: DiaryEntryInput) {
    return prisma.diaryEntry.create({
      data: {
        ...input,
        tenantId,
      },
      include: { class: true, discipline: true },
    });
  }

  async updateEntry(tenantId: string, id: string, input: Partial<DiaryEntryInput>) {
    const existing = await prisma.diaryEntry.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!existing) throw new AppError('Diary entry not found', 404);

    return prisma.diaryEntry.update({
      where: { id },
      data: input,
    });
  }

  async listAttendance(tenantId: string, params: PaginationParams, filter?: AttendanceFilter): Promise<PaginatedResponse<unknown>> {
    const where: Record<string, unknown> = { tenantId, deletedAt: null };
    if (filter?.classId) where.classId = filter.classId;
    if (filter?.disciplineId) where.disciplineId = filter.disciplineId;
    if (filter?.date) where.date = filter.date;
    if (filter?.studentId) where.studentId = filter.studentId;

    const [data, total] = await Promise.all([
      prisma.attendance.findMany({
        where,
        skip: params.skip,
        take: params.limit,
        orderBy: { date: 'desc' },
        include: { student: true, class: true, discipline: true },
      }),
      prisma.attendance.count({ where }),
    ]);
    return buildPaginatedResponse(data, total, params);
  }

  async createAttendance(tenantId: string, input: AttendanceInput) {
    return prisma.attendance.create({
      data: {
        ...input,
        tenantId,
      },
      include: { student: true, class: true, discipline: true },
    });
  }

  async bulkCreateAttendance(tenantId: string, records: AttendanceInput[]) {
    const data = records.map((r) => ({ ...r, tenantId }));
    const result = await prisma.attendance.createMany({ data });
    return { count: result.count };
  }

  async updateAttendance(tenantId: string, id: string, input: Partial<AttendanceInput>) {
    const existing = await prisma.attendance.findFirst({
      where: { id, tenantId, deletedAt: null },
    });
    if (!existing) throw new AppError('Attendance record not found', 404);

    return prisma.attendance.update({
      where: { id },
      data: input,
    });
  }

  async getFrequencyReport(tenantId: string, studentId: string) {
    const records = await prisma.attendance.findMany({
      where: { tenantId, studentId, deletedAt: null },
      include: { discipline: true, class: true },
      orderBy: { date: 'desc' },
    });
    const total = records.length;
    const present = records.filter((r) => r.present).length;
    const absent = total - present;
    const justified = records.filter((r) => r.justified).length;
    return { total, present, absent, justified, records };
  }
}

export const diarioService = new DiarioService();
