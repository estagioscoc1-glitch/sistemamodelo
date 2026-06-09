import { Router } from 'express';
import { notasController } from '../controllers/notas.controller';
import { authMiddleware } from '../middleware/auth';
import { validateBody } from '../middleware/security';
import { gradeSchema } from '../validators';

const router = Router();

// All notas routes require authentication
router.use(authMiddleware);

// List and create
router.get('/', (req, res, next) => notasController.list(req, res, next));
router.post('/', validateBody(gradeSchema), (req, res, next) => notasController.create(req, res, next));

// Batch operations
router.post('/bulk', (req, res, next) => notasController.bulkCreate(req, res, next));

// Reports
router.get('/boletim/:studentId', (req, res, next) => notasController.getStudentReport(req, res, next));
router.get('/medias', (req, res, next) => notasController.getAverages(req, res, next));

// Close period
router.post('/fechamento', (req, res, next) => notasController.close(req, res, next));

// Single grade operations
router.get('/:id', (req, res, next) => notasController.getById(req, res, next));
router.put('/:id', validateBody(gradeSchema), (req, res, next) => notasController.update(req, res, next));

export default router;
