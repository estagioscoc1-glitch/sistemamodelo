import { Router } from 'express';
import { estagiosController } from '../controllers/estagios.controller';
import { authMiddleware } from '../middleware/auth';
import { validateBody } from '../middleware/security';
import { internshipSchema } from '../validators';

const router = Router();

// All estagios routes require authentication
router.use(authMiddleware);

// Companies (must come before /:id to avoid conflicts)
router.get('/empresas', (req, res, next) => estagiosController.listCompanies(req, res, next));
router.post('/empresas', (req, res, next) => estagiosController.createCompany(req, res, next));
router.get('/empresas/:id', (req, res, next) => estagiosController.getCompanyById(req, res, next));
router.put('/empresas/:id', (req, res, next) => estagiosController.updateCompany(req, res, next));

// Internships CRUD
router.get('/', (req, res, next) => estagiosController.listInternships(req, res, next));
router.post('/', validateBody(internshipSchema), (req, res, next) => estagiosController.createInternship(req, res, next));
router.get('/:id', (req, res, next) => estagiosController.getInternshipById(req, res, next));
router.put('/:id', validateBody(internshipSchema), (req, res, next) => estagiosController.updateInternship(req, res, next));

export default router;
