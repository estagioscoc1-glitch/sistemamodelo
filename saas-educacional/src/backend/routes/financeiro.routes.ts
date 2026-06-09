import { Router } from 'express';
import { financeiroController } from '../controllers/financeiro.controller';
import { authMiddleware } from '../middleware/auth';
import { validateBody } from '../middleware/security';
import { financialAccountSchema, financialPaymentSchema } from '../validators';

const router = Router();

// All financeiro routes require authentication
router.use(authMiddleware);

// Accounts
router.get('/contas', (req, res, next) => financeiroController.listAccounts(req, res, next));
router.post('/contas', validateBody(financialAccountSchema), (req, res, next) => financeiroController.createAccount(req, res, next));
router.get('/contas/:id', (req, res, next) => financeiroController.getAccountById(req, res, next));
router.put('/contas/:id', validateBody(financialAccountSchema), (req, res, next) => financeiroController.updateAccount(req, res, next));

// Payments
router.get('/pagamentos', (req, res, next) => financeiroController.listPayments(req, res, next));
router.post('/pagamentos', validateBody(financialPaymentSchema), (req, res, next) => financeiroController.createPayment(req, res, next));
router.post('/pagamentos/gerar', (req, res, next) => financeiroController.bulkCreatePayments(req, res, next));
router.put('/pagamentos/:id', validateBody(financialPaymentSchema), (req, res, next) => financeiroController.updatePayment(req, res, next));

// Reports
router.get('/inadimplencia', (req, res, next) => financeiroController.getOverdueReport(req, res, next));
router.get('/fluxo', (req, res, next) => financeiroController.getCashFlow(req, res, next));

export default router;
