import { Router } from 'express';
import { requerimentosController } from '../controllers/requerimentos.controller';
import { authMiddleware } from '../middleware/auth';
import { validateBody } from '../middleware/security';
import { requestSchema } from '../validators';

const router = Router();

// All requerimentos routes require authentication
router.use(authMiddleware);

// Basic CRUD
router.get('/', (req, res, next) => requerimentosController.list(req, res, next));
router.post('/', validateBody(requestSchema), (req, res, next) => requerimentosController.create(req, res, next));
router.get('/:id', (req, res, next) => requerimentosController.getById(req, res, next));
router.put('/:id', validateBody(requestSchema), (req, res, next) => requerimentosController.update(req, res, next));

// Status update
router.patch('/:id/status', (req, res, next) => requerimentosController.updateStatus(req, res, next));

// By student
router.get('/aluno/:studentId', (req, res, next) => requerimentosController.listByStudent(req, res, next));

export default router;
