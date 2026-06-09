import express from 'express';
import cors from 'cors';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';
import { auditMiddleware } from './middleware/audit';
import { helmetMiddleware, rateLimitMiddleware, authRateLimitMiddleware } from './middleware/security';
import routes from './routes';

const app = express();

// Security middleware
app.use(helmetMiddleware);

// CORS - support multiple origins from env var (comma-separated)
const corsOrigins = config.cors.origin.split(',').map((o) => o.trim());
app.use(cors({ origin: corsOrigins.length === 1 ? corsOrigins[0] : corsOrigins }));

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use('/api', rateLimitMiddleware);
app.use('/api/auth', authRateLimitMiddleware);

// Audit logging for authenticated routes
app.use('/api', auditMiddleware);

// Routes
app.use('/api', routes);

// Error handler (must be last)
app.use(errorHandler);

// Start server only when not in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
}

export default app;
