import { Router } from 'express';
import { atasController } from '../controllers/atas.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// All atas routes require authentication
router.use(authMiddleware);

// Basic CRUD
router.get('/', (req, res, next) => atasController.list(req, res, next));
router.post('/', (req, res, next) => atasController.create(req, res, next));
router.get('/:id', (req, res, next) => atasController.getById(req, res, next));
router.put('/:id', (req, res, next) => atasController.update(req, res, next));

// Status update
router.patch('/:id/status', (req, res, next) => atasController.updateStatus(req, res, next));

// Duplicate
router.post('/:id/duplicate', (req, res, next) => atasController.duplicate(req, res, next));

export default router;
