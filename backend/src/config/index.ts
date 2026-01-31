import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // Server
  port: parseInt(process.env.PORT || '5000'),
  wsPort: parseInt(process.env.WS_PORT || '8080'),
  nodeEnv: process.env.NODE_ENV || 'development',
  appName: process.env.APP_NAME || 'Vive Code',
  appUrl: process.env.APP_URL || 'http://localhost:3000',
  apiUrl: process.env.API_URL || 'http://localhost:5000',

  // Database
  databaseUrl: process.env.DATABASE_URL || 'postgresql://localhost:5432/vivecode',
  redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',

  // Authentication
  jwtSecret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
  sessionSecret: process.env.SESSION_SECRET || 'your-session-secret',

  // OAuth - GitHub
  github: {
    clientId: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    callbackUrl: `${process.env.API_URL || 'http://localhost:5000'}/auth/github/callback`,
  },

  // OAuth - Google
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackUrl: `${process.env.API_URL || 'http://localhost:5000'}/auth/google/callback`,
  },

  // Netlify
  netlify: {
    clientId: process.env.NETLIFY_CLIENT_ID || '',
    clientSecret: process.env.NETLIFY_CLIENT_SECRET || '',
  },

  // AI Providers
  ai: {
    openai: {
      apiKey: process.env.OPENAI_API_KEY || '',
    },
    gemini: {
      apiKey: process.env.GEMINI_API_KEY || '',
    },
    perplexity: {
      apiKey: process.env.PERPLEXITY_API_KEY || '',
    },
    openrouter: {
      apiKey: process.env.OPENROUTER_API_KEY || '',
    },
    edenAi: {
      apiKey: process.env.EDEN_AI_API_KEY || '',
    },
    longcatAi: {
      apiKey: process.env.LONGCAT_AI_API_KEY || '',
    },
    promptLimitPerWeek: parseInt(process.env.AI_PROMPT_LIMIT_PER_WEEK || '1000'),
    defaultProvider: process.env.AI_DEFAULT_PROVIDER || 'openai',
  },

  // Storage (S3-compatible)
  storage: {
    endpoint: process.env.S3_ENDPOINT || 'http://localhost:9000',
    accessKey: process.env.S3_ACCESS_KEY || 'minioadmin',
    secretKey: process.env.S3_SECRET_KEY || 'minioadmin',
    bucket: process.env.S3_BUCKET || 'vivecode-projects',
  },

  // Docker & Sandbox
  docker: {
    host: process.env.DOCKER_HOST || 'unix:///var/run/docker.sock',
    sandboxTimeout: parseInt(process.env.SANDBOX_TIMEOUT || '300'),
    maxConcurrentSandboxes: parseInt(process.env.MAX_CONCURRENT_SANDBOXES || '10'),
  },

  // Email
  email: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },

  // Rate Limiting
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  },

  // CORS
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  },

  // Feature Flags
  features: {
    collaboration: process.env.FEATURE_COLLABORATION === 'true',
    aiAssistance: process.env.FEATURE_AI_ASSISTANCE === 'true',
    educationMode: process.env.FEATURE_EDUCATION_MODE === 'true',
    marketplace: process.env.FEATURE_MARKETPLACE === 'true',
  },
};
