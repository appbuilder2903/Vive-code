# Quick Start Guide - Vive Code

This guide will help you get Vive Code up and running on your local machine in minutes.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **npm** v9 or higher (comes with Node.js)
- **Docker Desktop** ([Download](https://www.docker.com/products/docker-desktop))
- **Git** ([Download](https://git-scm.com/))

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/appbuilder2903/Vive-code.git
cd Vive-code
```

### 2. Install Dependencies

This will install all dependencies for frontend, backend, and shared packages:

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your API keys. For development, you can use the keys from `API_KEYS_REFERENCE.txt` (if available), or use your own.

**Required for basic functionality:**
- `JWT_SECRET` - Any random string for JWT signing
- `SESSION_SECRET` - Any random string for sessions

**Optional but recommended:**
- `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` - For GitHub OAuth
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` - For Google OAuth
- AI provider API keys (at least one) - For AI features

### 4. Start Services with Docker

Start PostgreSQL, Redis, and MinIO:

```bash
docker-compose up -d postgres redis minio
```

Wait a few seconds for services to be ready.

### 5. Start the Development Servers

**Option A: Start Everything (Recommended)**

```bash
npm run dev
```

This starts both frontend and backend concurrently.

**Option B: Start Separately**

Terminal 1 - Backend:
```bash
npm run dev:backend
```

Terminal 2 - Frontend:
```bash
npm run dev:frontend
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MinIO Console**: http://localhost:9001 (admin/minioadmin)

## First Steps

1. **Visit the Homepage**: Open http://localhost:3000
2. **Sign In**: Click "Sign In" and authenticate with GitHub or Google
3. **Create a Project**: Click "New Project" from the dashboard
4. **Start Coding**: Use the Monaco editor to write code
5. **Run Code**: Click the "Run" button to execute your code
6. **Try AI**: Ask the AI assistant for help with your code

## Troubleshooting

### Port Already in Use

If you get an error about ports being in use:

```bash
# Stop all Docker containers
docker-compose down

# Kill processes on specific ports (macOS/Linux)
lsof -ti:3000 | xargs kill -9  # Frontend
lsof -ti:5000 | xargs kill -9  # Backend
lsof -ti:5432 | xargs kill -9  # PostgreSQL
```

### Dependencies Not Installing

Clear caches and reinstall:

```bash
npm run clean
rm -rf node_modules
npm install
```

### Docker Issues

Restart Docker Desktop and try again:

```bash
docker-compose down
docker-compose up -d
```

### Build Errors

Make sure you're using the correct Node.js version:

```bash
node --version  # Should be v18 or higher
npm --version   # Should be v9 or higher
```

## Development Workflow

### Running Tests

```bash
npm run test
```

### Linting Code

```bash
npm run lint
```

### Formatting Code

```bash
npm run format
```

### Building for Production

```bash
npm run build
```

### Viewing Logs

Backend logs:
```bash
docker-compose logs -f backend
```

Database logs:
```bash
docker-compose logs -f postgres
```

## Next Steps

- Read the [Architecture Documentation](../docs/ARCHITECTURE.md)
- Check out the [API Documentation](../docs/API.md)
- Learn how to [Contribute](../docs/CONTRIBUTING.md)
- Explore [Templates](http://localhost:3000/templates)
- Try [Education Mode](http://localhost:3000/education)

## Common Tasks

### Creating a New Component

```bash
cd frontend/src/components
touch MyComponent.tsx
```

### Adding a New API Route

```bash
cd backend/src/routes
touch myroute.ts
```

Then add it to `backend/src/index.ts`.

### Running Database Migrations

```bash
# Future: Will use a migration tool like Prisma or TypeORM
```

### Clearing All Data

```bash
docker-compose down -v
docker-compose up -d
```

## Getting Help

- 📚 [Documentation](../docs)
- 💬 [GitHub Discussions](https://github.com/appbuilder2903/Vive-code/discussions)
- 🐛 [Report Issues](https://github.com/appbuilder2903/Vive-code/issues)

Happy coding with Vive Code! 🚀
