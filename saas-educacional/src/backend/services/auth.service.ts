import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AuthPayload } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';
import { prisma } from '../services/prisma.service';

export interface LoginInput {
  email: string;
  password: string;
  tenantId?: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  async login(input: LoginInput): Promise<TokenPair> {
    const whereClause: any = {
      email: input.email,
      isActive: true,
      deletedAt: null,
    };
    if (input.tenantId) {
      whereClause.tenantId = input.tenantId;
    }

    const user = await prisma.user.findFirst({
      where: whereClause,
    });

    if (!user) {
      throw new AppError('Invalid credentials', 401);
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    const tokens = this.generateTokens({
      userId: user.id,
      tenantId: user.tenantId,
      email: user.email,
      roleId: user.roleId || undefined,
    });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        refreshToken: tokens.refreshToken,
        lastLogin: new Date(),
      },
    });

    return tokens;
  }

  async refresh(refreshToken: string): Promise<TokenPair> {
    try {
      const payload = jwt.verify(
        refreshToken,
        config.jwt.refreshSecret
      ) as AuthPayload;

      const user = await prisma.user.findFirst({
        where: {
          id: payload.userId,
          refreshToken: refreshToken,
          isActive: true,
          deletedAt: null,
        },
      });

      if (!user) {
        throw new AppError('Invalid refresh token', 401);
      }

      const tokens = this.generateTokens({
        userId: user.id,
        tenantId: user.tenantId,
        email: user.email,
        roleId: user.roleId || undefined,
      });

      await prisma.user.update({
        where: { id: user.id },
        data: { refreshToken: tokens.refreshToken },
      });

      return tokens;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError('Invalid refresh token', 401);
    }
  }

  async logout(userId: string): Promise<void> {
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
  }

  private generateTokens(payload: AuthPayload): TokenPair {
    const accessToken = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn as string | number,
    } as jwt.SignOptions);

    const refreshToken = jwt.sign(payload, config.jwt.refreshSecret, {
      expiresIn: config.jwt.refreshExpiresIn as string | number,
    } as jwt.SignOptions);

    return { accessToken, refreshToken };
  }
}

export const authService = new AuthService();
