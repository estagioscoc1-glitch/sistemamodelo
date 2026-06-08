import { Router } from 'express';
import authRoutes from './auth.routes';
import cadastrosRoutes from './cadastros.routes';
import matriculasRoutes from './matriculas.routes';
import notasRoutes from './notas.routes';
import diarioRoutes from './diario.routes';
import estagiosRoutes from './estagios.routes';
import financeiroRoutes from './financeiro.routes';
import requerimentosRoutes from './requerimentos.routes';
import atasRoutes from './atas.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/cadastros', cadastrosRoutes);
router.use('/matriculas', matriculasRoutes);
router.use('/notas', notasRoutes);
router.use('/diario', diarioRoutes);
router.use('/estagios', estagiosRoutes);
router.use('/financeiro', financeiroRoutes);
router.use('/requerimentos', requerimentosRoutes);
router.use('/atas', atasRoutes);

// Health check
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
