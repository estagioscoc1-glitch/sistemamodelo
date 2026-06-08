import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { diarioService } from '../services/diario.service';
import { parsePagination } from '../utils/pagination';
import { AppError } from '../middleware/errorHandler';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getParamId(params: any): string {
  return String(params.id);
}

export class DiarioController {
  async listEntries(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const params = parsePagination(req.query as { page?: string; limit?: string });
      const filter = {
        classId: req.query.classId as string | undefined,
        disciplineId: req.query.disciplineId as string | undefined,
        type: req.query.type as string | undefined,
        date: req.query.date ? new Date(req.query.date as string) : undefined,
      };
      const result = await diarioService.listEntries(req.user.tenantId, params, filter);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async getEntryById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await diarioService.getEntryById(req.user.tenantId, getParamId(req.params));
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async createEntry(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      if (!req.body.classId || !req.body.disciplineId || !req.body.date || !req.body.type) {
        throw new AppError('classId, disciplineId, date and type are required', 400);
      }
      const result = await diarioService.createEntry(req.user.tenantId, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async updateEntry(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await diarioService.updateEntry(req.user.tenantId, getParamId(req.params), req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async listAttendance(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const params = parsePagination(req.query as { page?: string; limit?: string });
      const filter = {
        classId: req.query.classId as string | undefined,
        disciplineId: req.query.disciplineId as string | undefined,
        date: req.query.date ? new Date(req.query.date as string) : undefined,
        studentId: req.query.studentId as string | undefined,
      };
      const result = await diarioService.listAttendance(req.user.tenantId, params, filter);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async createAttendance(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      if (!req.body.studentId || !req.body.classId || !req.body.disciplineId || !req.body.date) {
        throw new AppError('studentId, classId, disciplineId and date are required', 400);
      }
      const result = await diarioService.createAttendance(req.user.tenantId, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async bulkCreateAttendance(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      if (!Array.isArray(req.body.records)) {
        throw new AppError('records array is required', 400);
      }
      const result = await diarioService.bulkCreateAttendance(req.user.tenantId, req.body.records);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async updateAttendance(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await diarioService.updateAttendance(req.user.tenantId, getParamId(req.params), req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getFrequencyReport(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const studentId = String(req.params.studentId);
      const result = await diarioService.getFrequencyReport(req.user.tenantId, studentId);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}

export const diarioController = new DiarioController();
