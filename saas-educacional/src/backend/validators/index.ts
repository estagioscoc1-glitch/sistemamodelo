import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email invalido'),
  password: z.string().min(1, 'Senha obrigatoria'),
  tenantId: z.string().uuid('Tenant ID invalido'),
});

export const studentSchema = z.object({
  name: z.string().min(1, 'Nome obrigatorio'),
  email: z.string().email('Email invalido').optional().nullable(),
  phone: z.string().optional().nullable(),
  cpf: z.string().optional().nullable(),
  rg: z.string().optional().nullable(),
  birthDate: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  motherName: z.string().optional().nullable(),
  fatherName: z.string().optional().nullable(),
  guardianName: z.string().optional().nullable(),
  guardianPhone: z.string().optional().nullable(),
  registration: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
});

export const courseSchema = z.object({
  name: z.string().min(1, 'Nome obrigatorio'),
  code: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  duration: z.number().int().optional().nullable(),
  modality: z.string().optional().nullable(),
  unitId: z.string().uuid().optional().nullable(),
  isActive: z.boolean().optional(),
});

export const classSchema = z.object({
  courseId: z.string().uuid('Course ID obrigatorio'),
  name: z.string().min(1, 'Nome obrigatorio'),
  code: z.string().optional().nullable(),
  year: z.number().int('Ano obrigatorio'),
  semester: z.number().int().optional().nullable(),
  shift: z.string().optional().nullable(),
  maxStudents: z.number().int().optional().nullable(),
  unitId: z.string().uuid().optional().nullable(),
  isActive: z.boolean().optional(),
});

export const enrollmentSchema = z.object({
  studentId: z.string().uuid('Student ID obrigatorio'),
  courseId: z.string().uuid('Course ID obrigatorio'),
  classId: z.string().uuid().optional().nullable(),
  code: z.string().optional().nullable(),
  status: z.enum(['ACTIVE', 'RENEWED', 'TRANSFERRED', 'CANCELLED', 'SUSPENDED', 'COMPLETED']).optional(),
  enrollDate: z.string().optional().nullable(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  observation: z.string().optional().nullable(),
});

export const gradeSchema = z.object({
  studentId: z.string().uuid('Student ID obrigatorio'),
  classId: z.string().uuid('Class ID obrigatorio'),
  disciplineId: z.string().uuid('Discipline ID obrigatorio'),
  evaluation: z.string().optional().nullable(),
  value: z.number().optional().nullable(),
  weight: z.number().optional().nullable(),
  recovery: z.number().optional().nullable(),
  finalGrade: z.number().optional().nullable(),
  status: z.string().optional().nullable(),
  period: z.number().int().optional().nullable(),
  year: z.number().int().optional().nullable(),
});

export const attendanceSchema = z.object({
  studentId: z.string().uuid('Student ID obrigatorio'),
  classId: z.string().uuid('Class ID obrigatorio'),
  disciplineId: z.string().uuid('Discipline ID obrigatorio'),
  date: z.string().min(1, 'Data obrigatoria'),
  present: z.boolean().optional(),
  justified: z.boolean().optional(),
  observation: z.string().optional().nullable(),
});

export const diaryEntrySchema = z.object({
  classId: z.string().uuid('Class ID obrigatorio'),
  disciplineId: z.string().uuid('Discipline ID obrigatorio'),
  date: z.string().min(1, 'Data obrigatoria'),
  type: z.enum(['ATTENDANCE', 'GRADES', 'CONTENT']),
  content: z.string().optional().nullable(),
  topic: z.string().optional().nullable(),
  observations: z.string().optional().nullable(),
});

export const internshipSchema = z.object({
  studentId: z.string().uuid('Student ID obrigatorio'),
  companyId: z.string().uuid().optional().nullable(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
  workload: z.number().int().optional().nullable(),
  supervisor: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  observation: z.string().optional().nullable(),
});

export const requestSchema = z.object({
  studentId: z.string().uuid('Student ID obrigatorio'),
  type: z.string().min(1, 'Tipo obrigatorio'),
  protocol: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'APPROVED', 'REJECTED', 'COMPLETED']).optional(),
  response: z.string().optional().nullable(),
});

export const minutesSchema = z.object({
  title: z.string().min(1, 'Titulo obrigatorio'),
  date: z.string().min(1, 'Data obrigatoria'),
  type: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  participants: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
});

export const financialAccountSchema = z.object({
  studentId: z.string().uuid('Student ID obrigatorio'),
  description: z.string().optional().nullable(),
  totalAmount: z.number().min(0, 'Valor deve ser positivo'),
  dueDate: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
});

export const financialPaymentSchema = z.object({
  accountId: z.string().uuid('Account ID obrigatorio'),
  installment: z.number().int('Parcela obrigatoria'),
  amount: z.number().min(0, 'Valor deve ser positivo'),
  dueDate: z.string().min(1, 'Data de vencimento obrigatoria'),
  paidDate: z.string().optional().nullable(),
  paidAmount: z.number().optional().nullable(),
  status: z.enum(['PENDING', 'PAID', 'OVERDUE', 'CANCELLED']).optional(),
});
