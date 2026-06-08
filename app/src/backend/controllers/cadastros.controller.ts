import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { cursosService, turmasService, alunosService } from '../services/cadastros.service';
import { parsePagination } from '../utils/pagination';
import { AppError } from '../middleware/errorHandler';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getParamId(params: any): string {
  return String(params.id);
}

// ==========================================
// COURSES CONTROLLER
// ==========================================

export class CursosController {
  async list(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const params = parsePagination(req.query as { page?: string; limit?: string });
      const result = await cursosService.list(req.user.tenantId, params);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await cursosService.getById(req.user.tenantId, getParamId(req.params));
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      if (!req.body.name) throw new AppError('Name is required', 400);
      const result = await cursosService.create(req.user.tenantId, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await cursosService.update(req.user.tenantId, getParamId(req.params), req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      await cursosService.delete(req.user.tenantId, getParamId(req.params));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

// ==========================================
// CLASSES CONTROLLER
// ==========================================

export class TurmasController {
  async list(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const params = parsePagination(req.query as { page?: string; limit?: string });
      const result = await turmasService.list(req.user.tenantId, params);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await turmasService.getById(req.user.tenantId, getParamId(req.params));
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      if (!req.body.name || !req.body.courseId || !req.body.year) {
        throw new AppError('Name, courseId and year are required', 400);
      }
      const result = await turmasService.create(req.user.tenantId, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await turmasService.update(req.user.tenantId, getParamId(req.params), req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      await turmasService.delete(req.user.tenantId, getParamId(req.params));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

// ==========================================
// STUDENTS CONTROLLER
// ==========================================

export class AlunosController {
  async list(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const params = parsePagination(req.query as { page?: string; limit?: string });
      const result = await alunosService.list(req.user.tenantId, params);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await alunosService.getById(req.user.tenantId, getParamId(req.params));
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      if (!req.body.name) throw new AppError('Name is required', 400);
      const result = await alunosService.create(req.user.tenantId, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await alunosService.update(req.user.tenantId, getParamId(req.params), req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      await alunosService.delete(req.user.tenantId, getParamId(req.params));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

export const cursosController = new CursosController();
export const turmasController = new TurmasController();
export const alunosController = new AlunosController();
