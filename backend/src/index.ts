import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import passport from 'passport';
import rateLimit from 'express-rate-limit';
import { config } from './config';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { authMiddleware } from './middleware/auth';

// Import routes
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import aiRoutes from './routes/ai';
import executionRoutes from './routes/execution';
import templateRoutes from './routes/templates';
import collaborationRoutes from './routes/collaboration';
import deploymentRoutes from './routes/deployment';
import educationRoutes from './routes/education';
import userRoutes from './routes/users';

// Import WebSocket server
import { initWebSocketServer } from './websocket';

// Initialize Express app
const app: Express = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: config.cors.origin,
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Session middleware
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: config.nodeEnv === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', authMiddleware, projectRoutes);
app.use('/api/ai', authMiddleware, aiRoutes);
app.use('/api/execute', authMiddleware, executionRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/collaboration', authMiddleware, collaborationRoutes);
app.use('/api/deployment', authMiddleware, deploymentRoutes);
app.use('/api/education', authMiddleware, educationRoutes);
app.use('/api/users', authMiddleware, userRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use(errorHandler);

// Start server
const server = app.listen(config.port, () => {
  logger.info(`${config.appName} Backend Server running on port ${config.port}`);
  logger.info(`Environment: ${config.nodeEnv}`);
});

// Initialize WebSocket server
initWebSocketServer(server);

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });
});

export default app;
