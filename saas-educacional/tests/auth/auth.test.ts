import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../../src/backend/config';

// Mock PrismaClient
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      user: {
        findFirst: jest.fn(),
        update: jest.fn(),
      },
    })),
  };
});

// Import after mocking
import { AuthService } from '../../src/backend/services/auth.service';
import { prisma } from '../../src/backend/services/prisma.service';

const mockedPrisma = prisma as jest.Mocked<typeof prisma>;

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return tokens for valid credentials', async () => {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const mockUser = {
        id: 'user-1',
        tenantId: 'tenant-1',
        email: 'test@example.com',
        passwordHash: hashedPassword,
        roleId: 'role-1',
        isActive: true,
        deletedAt: null,
      };

      (mockedPrisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
      (mockedPrisma.user.update as jest.Mock).mockResolvedValue(mockUser);

      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123',
        tenantId: 'tenant-1',
      });

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');

      // Verify the access token contains expected payload
      const decoded = jwt.verify(result.accessToken, config.jwt.secret) as Record<string, unknown>;
      expect(decoded.userId).toBe('user-1');
      expect(decoded.tenantId).toBe('tenant-1');
      expect(decoded.email).toBe('test@example.com');
    });

    it('should throw error for invalid email', async () => {
      (mockedPrisma.user.findFirst as jest.Mock).mockResolvedValue(null);

      await expect(
        authService.login({
          email: 'invalid@example.com',
          password: 'password123',
          tenantId: 'tenant-1',
        })
      ).rejects.toThrow('Invalid credentials');
    });

    it('should throw error for invalid password', async () => {
      const hashedPassword = await bcrypt.hash('correct-password', 10);
      const mockUser = {
        id: 'user-1',
        tenantId: 'tenant-1',
        email: 'test@example.com',
        passwordHash: hashedPassword,
        roleId: null,
        isActive: true,
        deletedAt: null,
      };

      (mockedPrisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);

      await expect(
        authService.login({
          email: 'test@example.com',
          password: 'wrong-password',
          tenantId: 'tenant-1',
        })
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('refresh', () => {
    it('should return new tokens for valid refresh token', async () => {
      const payload = {
        userId: 'user-1',
        tenantId: 'tenant-1',
        email: 'test@example.com',
      };

      const refreshToken = jwt.sign(payload, config.jwt.refreshSecret, {
        expiresIn: '7d',
      });

      const mockUser = {
        id: 'user-1',
        tenantId: 'tenant-1',
        email: 'test@example.com',
        refreshToken: refreshToken,
        roleId: null,
        isActive: true,
        deletedAt: null,
      };

      (mockedPrisma.user.findFirst as jest.Mock).mockResolvedValue(mockUser);
      (mockedPrisma.user.update as jest.Mock).mockResolvedValue(mockUser);

      const result = await authService.refresh(refreshToken);

      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
    });

    it('should throw error for invalid refresh token', async () => {
      await expect(authService.refresh('invalid-token')).rejects.toThrow(
        'Invalid refresh token'
      );
    });
  });

  describe('logout', () => {
    it('should clear refresh token for user', async () => {
      (mockedPrisma.user.update as jest.Mock).mockResolvedValue({});

      await authService.logout('user-1');

      expect(mockedPrisma.user.update).toHaveBeenCalledWith({
        where: { id: 'user-1' },
        data: { refreshToken: null },
      });
    });
  });
});
