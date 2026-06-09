import { Router } from 'express';
import authRoutes from './auth.routes';
import cadastrosRoutes from './cadastros.routes';
import matriculasRoutes from './matriculas.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/cadastros', cadastrosRoutes);
router.use('/matriculas', matriculasRoutes);

// Health check
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
