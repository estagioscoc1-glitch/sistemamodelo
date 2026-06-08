import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth';
import { authService } from '../services/auth.service';
import { AppError } from '../middleware/errorHandler';

export class AuthController {
  async login(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password, tenantId } = req.body;

      if (!email || !password || !tenantId) {
        throw new AppError('Email, password and tenantId are required', 400);
      }

      const tokens = await authService.login({ email, password, tenantId });

      res.json({
        success: true,
        data: tokens,
      });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        throw new AppError('Refresh token is required', 400);
      }

      const tokens = await authService.refresh(refreshToken);

      res.json({
        success: true,
        data: tokens,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new AppError('Authentication required', 401);
      }

      await authService.logout(req.user.userId);

      res.json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
