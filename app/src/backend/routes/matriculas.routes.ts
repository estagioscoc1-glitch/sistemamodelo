import { Router } from 'express';
import { matriculasController } from '../controllers/matriculas.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// All matriculas routes require authentication
router.use(authMiddleware);

// Basic CRUD
router.get('/', (req, res, next) => matriculasController.list(req, res, next));
router.post('/', (req, res, next) => matriculasController.create(req, res, next));
router.get('/:id', (req, res, next) => matriculasController.getById(req, res, next));
router.put('/:id', (req, res, next) => matriculasController.update(req, res, next));

// Lifecycle operations
router.post('/:id/renovar', (req, res, next) => matriculasController.renew(req, res, next));
router.post('/:id/transferir', (req, res, next) => matriculasController.transfer(req, res, next));
router.post('/:id/cancelar', (req, res, next) => matriculasController.cancel(req, res, next));
router.post('/:id/trancar', (req, res, next) => matriculasController.suspend(req, res, next));

export default router;
