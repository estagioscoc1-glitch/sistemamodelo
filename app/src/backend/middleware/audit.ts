import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';

export function auditMiddleware(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void {
  const auditData = {
    userId: req.user?.userId,
    tenantId: req.user?.tenantId,
    method: req.method,
    path: req.path,
    ip: req.ip,
    userAgent: req.get('user-agent'),
    timestamp: new Date().toISOString(),
  };

  // In production, this would write to the audit_logs table
  if (process.env.NODE_ENV === 'development') {
    console.log('[AUDIT]', JSON.stringify(auditData));
  }

  next();
}
