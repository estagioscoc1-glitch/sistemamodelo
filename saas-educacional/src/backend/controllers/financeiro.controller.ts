import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { financeiroService } from '../services/financeiro.service';
import { parsePagination } from '../utils/pagination';
import { AppError } from '../middleware/errorHandler';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getParamId(params: any): string {
  return String(params.id);
}

export class FinanceiroController {
  async listAccounts(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const params = parsePagination(req.query as { page?: string; limit?: string });
      const filters = {
        studentId: req.query.studentId as string | undefined,
        status: req.query.status as string | undefined,
      };
      const result = await financeiroService.listAccounts(req.user.tenantId, params, filters);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async getAccountById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await financeiroService.getAccountById(req.user.tenantId, getParamId(req.params));
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async createAccount(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      if (!req.body.studentId || !req.body.totalAmount) {
        throw new AppError('studentId and totalAmount are required', 400);
      }
      const result = await financeiroService.createAccount(req.user.tenantId, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async updateAccount(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await financeiroService.updateAccount(req.user.tenantId, getParamId(req.params), req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async listPayments(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const params = parsePagination(req.query as { page?: string; limit?: string });
      const filters = {
        accountId: req.query.accountId as string | undefined,
        status: req.query.status as string | undefined,
        dueDateStart: req.query.dueDateStart ? new Date(req.query.dueDateStart as string) : undefined,
        dueDateEnd: req.query.dueDateEnd ? new Date(req.query.dueDateEnd as string) : undefined,
      };
      const result = await financeiroService.listPayments(req.user.tenantId, params, filters);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async createPayment(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      if (!req.body.accountId) {
        throw new AppError('accountId is required', 400);
      }
      const result = await financeiroService.createPayment(req.user.tenantId, req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async bulkCreatePayments(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      if (!req.body.accountId || !req.body.installments || !req.body.amount || !req.body.startDate) {
        throw new AppError('accountId, installments, amount, and startDate are required', 400);
      }
      const result = await financeiroService.bulkCreatePayments(
        req.user.tenantId,
        req.body.accountId,
        req.body.installments,
        req.body.amount,
        new Date(req.body.startDate)
      );
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async updatePayment(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await financeiroService.updatePayment(req.user.tenantId, getParamId(req.params), req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getOverdueReport(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await financeiroService.getOverdueReport(req.user.tenantId);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getCashFlow(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) throw new AppError('Authentication required', 401);
      const result = await financeiroService.getCashFlow(req.user.tenantId);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}

export const financeiroController = new FinanceiroController();
