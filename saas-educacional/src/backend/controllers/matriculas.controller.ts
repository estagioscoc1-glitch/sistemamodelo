import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { matriculasService } from '../services/matriculas.service';
import { parsePagination } from '../utils/pagination';
import { AppError } from '../middleware/errorHandler';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getParamId(params: any): string {
  return String(params.id);
}

export class MatriculasController {
  async list(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const params = parsePagination(req.query as { page?: string; limit?: string });
      const result = await matriculasService.list(req.user.tenantId, params);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await matriculasService.getById(req.user.tenantId, getParamId(req.params));
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      if (!req.body.studentId || !req.body.courseId) {
        throw new AppError('studentId and courseId are required', 400);
      }
      const result = await matriculasService.create(req.user.tenantId, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await matriculasService.update(req.user.tenantId, getParamId(req.params), req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async renew(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await matriculasService.renew(req.user.tenantId, getParamId(req.params));
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async transfer(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await matriculasService.transfer(
        req.user.tenantId,
        getParamId(req.params),
        req.body.targetClassId
      );
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async cancel(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await matriculasService.cancel(
        req.user.tenantId,
        getParamId(req.params),
        req.body.reason
      );
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async suspend(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await matriculasService.suspend(
        req.user.tenantId,
        getParamId(req.params),
        req.body.reason
      );
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}

export const matriculasController = new MatriculasController();
