// ==========================================
// SHARED TYPE DEFINITIONS
// ==========================================

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export interface TenantEntity extends BaseEntity {
  tenantId: string;
}

export interface PaginationQuery {
  page?: string;
  limit?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: PaginationMeta;
}

export enum EnrollmentStatusEnum {
  ACTIVE = 'ACTIVE',
  RENEWED = 'RENEWED',
  TRANSFERRED = 'TRANSFERRED',
  CANCELLED = 'CANCELLED',
  SUSPENDED = 'SUSPENDED',
  COMPLETED = 'COMPLETED',
}

export enum RequestStatusEnum {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
}

export enum PaymentStatusEnum {
  PENDING = 'PENDING',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED',
}

export enum DiaryTypeEnum {
  ATTENDANCE = 'ATTENDANCE',
  GRADES = 'GRADES',
  CONTENT = 'CONTENT',
}
