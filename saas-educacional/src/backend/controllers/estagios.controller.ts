import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { estagiosService } from '../services/estagios.service';
import { parsePagination } from '../utils/pagination';
import { AppError } from '../middleware/errorHandler';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getParamId(params: any): string {
  return String(params.id);
}

export class EstagiosController {
  async listInternships(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const params = parsePagination(req.query as { page?: string; limit?: string });
      const filters = {
        studentId: req.query.studentId as string | undefined,
        status: req.query.status as string | undefined,
        companyId: req.query.companyId as string | undefined,
      };
      const result = await estagiosService.listInternships(req.user.tenantId, params, filters);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async getInternshipById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await estagiosService.getInternshipById(req.user.tenantId, getParamId(req.params));
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async createInternship(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      if (!req.body.studentId) {
        throw new AppError('studentId is required', 400);
      }
      const result = await estagiosService.createInternship(req.user.tenantId, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async updateInternship(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await estagiosService.updateInternship(req.user.tenantId, getParamId(req.params), req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async listCompanies(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const params = parsePagination(req.query as { page?: string; limit?: string });
      const result = await estagiosService.listCompanies(req.user.tenantId, params);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async getCompanyById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await estagiosService.getCompanyById(req.user.tenantId, getParamId(req.params));
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async createCompany(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      if (!req.body.name) {
        throw new AppError('name is required', 400);
      }
      const result = await estagiosService.createCompany(req.user.tenantId, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async updateCompany(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await estagiosService.updateCompany(req.user.tenantId, getParamId(req.params), req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}

export const estagiosController = new EstagiosController();
