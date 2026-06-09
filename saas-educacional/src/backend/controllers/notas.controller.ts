import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { notasService } from '../services/notas.service';
import { parsePagination } from '../utils/pagination';
import { AppError } from '../middleware/errorHandler';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getParamId(params: any): string {
  return String(params.id);
}

export class NotasController {
  async list(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const params = parsePagination(req.query as { page?: string; limit?: string });
      const filter = {
        classId: req.query.classId as string | undefined,
        disciplineId: req.query.disciplineId as string | undefined,
        studentId: req.query.studentId as string | undefined,
        period: req.query.period ? parseInt(req.query.period as string, 10) : undefined,
        year: req.query.year ? parseInt(req.query.year as string, 10) : undefined,
      };
      const result = await notasService.list(req.user.tenantId, params, filter);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await notasService.getById(req.user.tenantId, getParamId(req.params));
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      if (!req.body.studentId || !req.body.classId || !req.body.disciplineId) {
        throw new AppError('studentId, classId and disciplineId are required', 400);
      }
      const result = await notasService.create(req.user.tenantId, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await notasService.update(req.user.tenantId, getParamId(req.params), req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async bulkCreate(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      if (!Array.isArray(req.body.grades)) {
        throw new AppError('grades array is required', 400);
      }
      const result = await notasService.bulkCreate(req.user.tenantId, req.body.grades);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getStudentReport(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const studentId = String(req.params.studentId);
      const result = await notasService.getStudentReport(req.user.tenantId, studentId);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getAverages(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const filter = {
        classId: req.query.classId as string | undefined,
        disciplineId: req.query.disciplineId as string | undefined,
        period: req.query.period ? parseInt(req.query.period as string, 10) : undefined,
        year: req.query.year ? parseInt(req.query.year as string, 10) : undefined,
      };
      const result = await notasService.getAverages(req.user.tenantId, filter);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async close(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      if (!req.body.classId || !req.body.disciplineId || !req.body.period) {
        throw new AppError('classId, disciplineId and period are required', 400);
      }
      const result = await notasService.close(
        req.user.tenantId,
        req.body.classId,
        req.body.disciplineId,
        req.body.period
      );
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}

export const notasController = new NotasController();
