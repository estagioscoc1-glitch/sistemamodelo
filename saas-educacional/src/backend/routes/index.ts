import { Router } from 'express';
import authRoutes from './auth.routes';
import cadastrosRoutes from './cadastros.routes';
import matriculasRoutes from './matriculas.routes';
import notasRoutes from './notas.routes';
import diarioRoutes from './diario.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/cadastros', cadastrosRoutes);
router.use('/matriculas', matriculasRoutes);
router.use('/notas', notasRoutes);
router.use('/diario', diarioRoutes);

// Health check
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
