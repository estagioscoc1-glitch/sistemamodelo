import { Router } from 'express';
import { diarioController } from '../controllers/diario.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// All diario routes require authentication
router.use(authMiddleware);

// Diary entries
router.get('/entries', (req, res, next) => diarioController.listEntries(req, res, next));
router.post('/entries', (req, res, next) => diarioController.createEntry(req, res, next));
router.get('/entries/:id', (req, res, next) => diarioController.getEntryById(req, res, next));
router.put('/entries/:id', (req, res, next) => diarioController.updateEntry(req, res, next));

// Attendance
router.get('/attendance', (req, res, next) => diarioController.listAttendance(req, res, next));
router.post('/attendance', (req, res, next) => diarioController.createAttendance(req, res, next));
router.post('/attendance/bulk', (req, res, next) => diarioController.bulkCreateAttendance(req, res, next));
router.put('/attendance/:id', (req, res, next) => diarioController.updateAttendance(req, res, next));

// Reports
router.get('/frequency/:studentId', (req, res, next) => diarioController.getFrequencyReport(req, res, next));

export default router;
