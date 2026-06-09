import express from 'express';
import cors from 'cors';
import { config } from './config';
import { errorHandler } from './middleware/errorHandler';
import { auditMiddleware } from './middleware/audit';
import routes from './routes';

const app = express();

// Middleware
app.use(cors({ origin: config.cors.origin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
