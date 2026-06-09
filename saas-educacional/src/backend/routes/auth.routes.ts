import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth';
import { validateBody } from '../middleware/security';
import { loginSchema } from '../validators';

const router = Router();

router.post('/login', validateBody(loginSchema), (req, res, next) => authController.login(req, res, next));
router.post('/refresh', (req, res, next) => authController.refresh(req, res, next));
router.post('/logout', authMiddleware, (req, res, next) => authController.logout(req, res, next));

export default router;
