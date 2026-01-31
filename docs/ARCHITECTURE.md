# Vive Code - System Architecture

## Overview

Vive Code is designed as a modern, scalable, cloud-based IDE platform. The architecture follows a microservices-inspired approach with clear separation of concerns.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │   Web Browser   │  │  Mobile Apps    │  │ VSCode Ext  │ │
│  │   (React App)   │  │   (Future)      │  │  (Future)   │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Application Layer                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Frontend (React + Vite)                  │  │
│  │  • Monaco Editor  • WebSocket Client  • State Mgmt   │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                         API Gateway                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Express Server + WebSocket Server             │  │
│  │  • REST API  • OAuth  • JWT  • Rate Limiting          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Service Layer                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │   Auth   │  │    AI    │  │  Execute │  │  Deploy  │   │
│  │ Service  │  │ Service  │  │ Service  │  │ Service  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Project  │  │  Collab  │  │   Edu    │  │ Template │   │
│  │ Service  │  │ Service  │  │ Service  │  │ Service  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                       Data Layer                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │PostgreSQL│  │  Redis   │  │  MinIO   │  │  Docker  │   │
│  │    DB    │  │  Cache   │  │ Storage  │  │ Sandbox  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    External Services                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  GitHub  │  │  Google  │  │  OpenAI  │  │ Netlify  │   │
│  │   OAuth  │  │   OAuth  │  │ & AI APIs│  │  Deploy  │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. Frontend (React Application)

**Technology Stack:**
- React 18 with TypeScript
- Vite for build and dev server
- Monaco Editor for code editing
- TailwindCSS for styling
- React Query for server state
- Zustand for client state
- xterm.js for terminal

**Key Components:**
- **Editor Component**: Monaco-based code editor with syntax highlighting
- **File Explorer**: Tree view of project files
- **Terminal**: Integrated command-line interface
- **AI Panel**: Interface for AI-powered assistance
- **Collaboration Panel**: Real-time collaboration features
- **Preview Panel**: Live preview of web applications

**State Management:**
- Local state: React hooks
- Global state: Zustand stores
- Server state: React Query
- WebSocket state: Custom hooks

### 2. Backend (Node.js API Server)

**Technology Stack:**
- Node.js 18+ with Express
- TypeScript
- Passport.js for OAuth
- JWT for authentication
- WebSocket (ws library)
- Dockerode for container management

**API Routes:**

```
/api/auth
  POST /github          - GitHub OAuth
  POST /google          - Google OAuth
  GET  /me              - Get current user
  POST /logout          - Logout

/api/projects
  GET    /              - List projects
  POST   /              - Create project
  GET    /:id           - Get project
  PUT    /:id           - Update project
  DELETE /:id           - Delete project
  GET    /:id/files     - Get project files
  POST   /:id/files     - Save file

/api/ai
  POST /chat            - AI chat/completion
  GET  /usage           - Get AI usage stats

/api/execute
  POST /                - Execute code

/api/templates
  GET  /                - List templates
  GET  /:id             - Get template
  POST /                - Create template

/api/collaboration
  GET    /:projectId/collaborators
  POST   /:projectId/collaborators
  DELETE /:projectId/collaborators/:userId

/api/deployment
  POST /:projectId/netlify
  GET  /:deploymentId

/api/education
  GET  /classrooms
  POST /classrooms
  GET  /classrooms/:id/assignments
  POST /classrooms/:id/assignments
  POST /assignments/:id/submit
  POST /submissions/:id/grade

/api/users
  GET /profile
  PUT /profile
```

### 3. Database Schema

**PostgreSQL Tables:**

```sql
-- Users
users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  username VARCHAR(100) UNIQUE,
  display_name VARCHAR(255),
  avatar_url TEXT,
  role VARCHAR(20),
  github_id VARCHAR(100),
  google_id VARCHAR(100),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Projects
projects (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  owner_id UUID REFERENCES users(id),
  visibility VARCHAR(20),
  language VARCHAR(50),
  framework VARCHAR(50),
  template_id UUID,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Files
files (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  name VARCHAR(255),
  path TEXT,
  content TEXT,
  type VARCHAR(20),
  size INTEGER,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Collaborators
collaborators (
  user_id UUID REFERENCES users(id),
  project_id UUID REFERENCES projects(id),
  permission VARCHAR(20),
  joined_at TIMESTAMP,
  PRIMARY KEY (user_id, project_id)
)

-- Templates
templates (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  language VARCHAR(50),
  framework VARCHAR(50),
  category VARCHAR(50),
  author_id UUID REFERENCES users(id),
  downloads INTEGER DEFAULT 0,
  rating DECIMAL(2,1),
  created_at TIMESTAMP
)

-- AI Usage
ai_usage (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  prompts_used INTEGER DEFAULT 0,
  prompts_limit INTEGER DEFAULT 1000,
  week_start_date DATE,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Classrooms
classrooms (
  id UUID PRIMARY KEY,
  name VARCHAR(255),
  description TEXT,
  teacher_id UUID REFERENCES users(id),
  created_at TIMESTAMP
)

-- Assignments
assignments (
  id UUID PRIMARY KEY,
  classroom_id UUID REFERENCES classrooms(id),
  title VARCHAR(255),
  description TEXT,
  due_date TIMESTAMP,
  template_id UUID,
  max_score INTEGER,
  created_at TIMESTAMP
)

-- Submissions
submissions (
  id UUID PRIMARY KEY,
  assignment_id UUID REFERENCES assignments(id),
  student_id UUID REFERENCES users(id),
  project_id UUID REFERENCES projects(id),
  score INTEGER,
  feedback TEXT,
  submitted_at TIMESTAMP,
  graded_at TIMESTAMP
)

-- Deployments
deployments (
  id UUID PRIMARY KEY,
  project_id UUID REFERENCES projects(id),
  provider VARCHAR(50),
  url TEXT,
  status VARCHAR(20),
  build_logs TEXT,
  created_at TIMESTAMP
)
```

### 4. Real-Time Communication (WebSocket)

**Message Types:**
- `USER_JOIN` - User joins project
- `USER_LEAVE` - User leaves project
- `CURSOR_MOVE` - Cursor position update
- `FILE_CHANGE` - File content change
- `CHAT_MESSAGE` - Chat message
- `SYNC_REQUEST` - Request full state sync
- `SYNC_RESPONSE` - Full state response

**Flow:**
1. Client connects via WebSocket
2. Client sends USER_JOIN with projectId
3. Server broadcasts to all users in that project
4. File changes propagated in real-time
5. Cursor positions tracked and displayed

### 5. Code Execution (Sandboxing)

**Security Model:**
- Each execution runs in isolated Docker container
- Limited CPU and memory resources
- Network access controlled
- Timeout enforced (default 300s)
- Dangerous code patterns detected and blocked

**Execution Flow:**
1. User clicks "Run"
2. Code sent to execution service
3. Docker container created
4. Code executed in container
5. Output streamed back via WebSocket
6. Container destroyed after execution

### 6. AI Integration

**Provider Architecture:**
- Unified interface for all AI providers
- Automatic fallback if primary fails
- Usage tracking per user
- Rate limiting (1000 prompts/week)
- Cost tracking

**AI Features:**
- Code completion
- Code explanation
- Bug fixing
- Code generation
- Refactoring
- Language translation
- Test generation

### 7. Authentication & Authorization

**OAuth Flow:**
1. User clicks "Sign in with GitHub/Google"
2. Redirected to OAuth provider
3. User authorizes application
4. Callback with authorization code
5. Exchange code for access token
6. Create/update user in database
7. Generate JWT token
8. Return JWT to frontend
9. Store JWT in localStorage
10. Include JWT in subsequent API requests

**Authorization:**
- Role-based access control (RBAC)
- Roles: Admin, Teacher, Student, User
- Permission checks on all protected routes
- Project-level permissions (Owner, Editor, Viewer)

### 8. Deployment Pipeline

**Netlify Integration:**
1. User clicks "Deploy"
2. Project files packaged
3. Build command executed
4. Artifacts uploaded to Netlify
5. Site deployed
6. URL returned to user
7. Deployment status tracked

## Scaling Considerations

### Horizontal Scaling
- Frontend: CDN distribution
- Backend: Load balancer + multiple instances
- Database: Read replicas
- WebSocket: Sticky sessions or Redis adapter

### Vertical Scaling
- Increase container resources
- Database optimization
- Caching strategies

### Performance Optimization
- Code splitting in frontend
- Lazy loading of components
- Database query optimization
- Redis caching for frequently accessed data
- CDN for static assets
- WebSocket connection pooling

## Security Measures

1. **Authentication**: OAuth 2.0, JWT tokens
2. **Authorization**: RBAC, permission checks
3. **Data Protection**: HTTPS, encrypted storage
4. **Input Validation**: Sanitization, validation
5. **Rate Limiting**: API and AI usage limits
6. **Sandboxing**: Isolated code execution
7. **Secret Management**: Environment variables
8. **CORS**: Restricted origins
9. **Helmet**: Security headers
10. **Audit Logging**: User actions tracked

## Monitoring & Observability

- Application logs (Winston)
- Error tracking
- Performance metrics
- User analytics
- Usage statistics
- Uptime monitoring

## Disaster Recovery

- Regular database backups
- Point-in-time recovery
- Multi-region deployment (future)
- Automated failover
- Data replication

## Future Enhancements

1. Microservices architecture
2. Kubernetes orchestration
3. GraphQL API
4. Elasticsearch for search
5. Message queue (RabbitMQ/Kafka)
6. API gateway (Kong/Ambassador)
7. Service mesh (Istio)
8. Distributed tracing (Jaeger)
9. Metrics (Prometheus + Grafana)
10. Machine learning pipeline
