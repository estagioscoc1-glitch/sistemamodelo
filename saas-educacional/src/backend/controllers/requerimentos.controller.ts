import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { requerimentosService } from '../services/requerimentos.service';
import { parsePagination } from '../utils/pagination';
import { AppError } from '../middleware/errorHandler';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getParamId(params: any): string {
  return String(params.id);
}

export class RequerimentosController {
  async list(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const params = parsePagination(req.query as { page?: string; limit?: string });
      const filters = {
        studentId: req.query.studentId as string | undefined,
        status: req.query.status as string | undefined,
        type: req.query.type as string | undefined,
      };
      const result = await requerimentosService.list(req.user.tenantId, params, filters);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await requerimentosService.getById(req.user.tenantId, getParamId(req.params));
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      if (!req.body.studentId || !req.body.type) {
        throw new AppError('studentId and type are required', 400);
      }
      const result = await requerimentosService.create(req.user.tenantId, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await requerimentosService.update(req.user.tenantId, getParamId(req.params), req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      if (!req.body.status) {
        throw new AppError('status is required', 400);
      }
      const result = await requerimentosService.updateStatus(
        req.user.tenantId,
        getParamId(req.params),
        req.body.status,
        req.body.response
      );
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async listByStudent(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const studentId = String((req.params as any).studentId);
      const result = await requerimentosService.listByStudent(req.user.tenantId, studentId);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}

export const requerimentosController = new RequerimentosController();
