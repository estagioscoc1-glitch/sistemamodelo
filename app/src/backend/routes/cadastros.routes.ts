import { Router } from 'express';
import { cursosController, turmasController, alunosController } from '../controllers/cadastros.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// All cadastros routes require authentication
router.use(authMiddleware);

// Courses (Cursos)
router.get('/cursos', (req, res, next) => cursosController.list(req, res, next));
router.post('/cursos', (req, res, next) => cursosController.create(req, res, next));
router.get('/cursos/:id', (req, res, next) => cursosController.getById(req, res, next));
router.put('/cursos/:id', (req, res, next) => cursosController.update(req, res, next));
router.delete('/cursos/:id', (req, res, next) => cursosController.delete(req, res, next));

// Classes (Turmas)
router.get('/turmas', (req, res, next) => turmasController.list(req, res, next));
router.post('/turmas', (req, res, next) => turmasController.create(req, res, next));
router.get('/turmas/:id', (req, res, next) => turmasController.getById(req, res, next));
router.put('/turmas/:id', (req, res, next) => turmasController.update(req, res, next));
router.delete('/turmas/:id', (req, res, next) => turmasController.delete(req, res, next));

// Students (Alunos)
router.get('/alunos', (req, res, next) => alunosController.list(req, res, next));
router.post('/alunos', (req, res, next) => alunosController.create(req, res, next));
router.get('/alunos/:id', (req, res, next) => alunosController.getById(req, res, next));
router.put('/alunos/:id', (req, res, next) => alunosController.update(req, res, next));
router.delete('/alunos/:id', (req, res, next) => alunosController.delete(req, res, next));

export default router;
