# Vive Code - Advanced Online IDE Platform

<div align="center">

![Vive Code Logo](frontend/public/logo.svg)

**The Next-Generation Cloud-Based Coding Platform**

[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.1+-blue.svg)](https://www.typescriptlang.org/)

</div>

---

## 🎉 Latest Updates

### ✨ **NEW: Professional Logo & Complete Replit-like Functionality!**

Vive Code now features:
- 🎨 **Beautiful animated logo** with dark mode support
- 📁 **Full file operations** - create, delete, rename files & folders
- 💾 **Auto-save** - never lose your work
- ⌨️ **Keyboard shortcuts** - Ctrl/Cmd+S to save, Ctrl/Cmd+Enter to run
- 🗂️ **Interactive file explorer** with context menus
- 🎯 **Professional IDE experience** matching Replit and more!

See [Feature Updates](docs/FEATURE_UPDATES.md) for complete details.

---

## 🚀 Overview

**Vive Code** is a powerful, feature-rich online IDE that combines the best aspects of Replit with advanced AI capabilities, real-time collaboration, and comprehensive educational tools. Built for developers, students, and educators, Vive Code provides a complete cloud-based development environment accessible from any browser.

## ✨ Key Features

### 🎯 Core IDE Capabilities
- **Browser-Based Code Editor** with Monaco Editor (VS Code engine)
- **50+ Programming Languages** supported with syntax highlighting
- **File Operations** - Create, delete, rename files and folders
- **Auto-save** - Automatic saving after 2 seconds of inactivity
- **Keyboard Shortcuts** - Ctrl/Cmd+S (save), Ctrl/Cmd+Enter (run)
- **Interactive File Explorer** with right-click context menus
- **File & Folder Management** with intuitive tree view
- **Auto-Indentation & Formatting** on paste and type
- **Environment Variables** & Secrets Management
- **Real-Time Console Output** with clear functionality
- **Error Highlighting** and debugging
- **Professional Logo** with animated cursor and dark mode support

### 🤖 AI-Powered Assistance (6 Providers)
- **OpenAI GPT-4** - Industry-leading AI for code generation
- **Google Gemini** - Advanced reasoning and code understanding
- **Perplexity AI** - Real-time web-enhanced coding help
- **OpenRouter** - Access to multiple AI models
- **Eden AI** - Unified AI platform integration
- **Longcat AI** - Specialized coding assistance

**AI Features:**
- Code completion and suggestions
- Explain code functionality
- Fix errors automatically
- Generate code from natural language
- Refactor and optimize code
- Convert code between languages
- Generate unit tests
- Debug assistance
- **1000 AI prompts per week** included

### 👥 Real-Time Collaboration
- Live multiplayer editing
- Cursor tracking for all collaborators
- In-project chat
- Permission management (Viewer/Editor/Admin)
- Version history and rollback
- Share projects with custom URLs

### 🎓 Education Mode
- **Classroom Management System**
- Create and manage multiple classrooms
- **Assignment Creation & Distribution**
- Student submission tracking
- **Auto-Grading System**
- Plagiarism detection
- Teacher dashboard with analytics
- Student progress tracking

### 🔧 Code Execution & Preview
- One-click Run button
- Live web preview panel
- Backend + Frontend hosting
- REST API hosting
- WebSocket support
- Static site hosting
- Public project URLs
- Auto-restart on file changes

### 🚢 Deployment Options
- **One-Click Netlify Deployment**
- Custom subdomain support
- Always-on applications
- Background workers
- Cron jobs / Scheduled tasks
- Auto-scaling
- Custom domains

### 🔐 Authentication & Security
- GitHub OAuth integration
- Google OAuth integration
- Email login support
- JWT-based authentication
- Role-based access control (RBAC)
- Public and private projects
- Secure secrets management

### 💾 Database & Storage
- Built-in PostgreSQL database
- Redis caching
- Key-value storage
- File storage (S3-compatible)
- SQLite support for projects
- Persistent storage
- JSON storage API

### 🔄 Git Integration
- Import GitHub repositories
- Export projects to GitHub
- Commit, push, pull operations
- Branch management
- Commit history viewer
- Repository synchronization

### 📦 Templates & Marketplace
- 100+ ready-to-use templates
- Language starters (Python, JavaScript, Java, etc.)
- Framework templates (React, Vue, Express, Flask, etc.)
- API templates
- Game development templates
- Community template sharing
- Template marketplace

### 🎨 User Experience
- Dark / Light theme support
- Mobile-friendly responsive design
- Customizable editor settings
- Keyboard shortcuts
- Split-pane editor
- Terminal emulator (xterm.js)
- File upload/download
- ZIP file support

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling
- Monaco Editor (VS Code editor)
- TailwindCSS for styling
- React Query for state management
- Zustand for global state
- React Router for navigation
- xterm.js for terminal emulation

**Backend:**
- Node.js with Express
- TypeScript
- Passport.js for OAuth
- JWT for authentication
- WebSocket (ws) for real-time features
- PostgreSQL for database
- Redis for caching
- Docker for sandboxed execution

**Infrastructure:**
- Docker & Docker Compose
- MinIO for S3-compatible storage
- Nginx (production reverse proxy)
- CI/CD with GitHub Actions

## 📋 Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/appbuilder2903/Vive-code.git
cd Vive-code
```

### 2. Install Dependencies

```bash
npm install
```

This will install dependencies for all workspaces (frontend, backend, shared).

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and add your API keys and configuration:
- GitHub OAuth credentials
- Google OAuth credentials
- AI provider API keys (OpenAI, Gemini, etc.)
- Netlify deployment credentials
- Database connection strings

### 4. Start Services with Docker Compose

```bash
docker-compose up -d
```

This starts:
- PostgreSQL database
- Redis cache
- MinIO object storage
- Backend API server
- Frontend development server

### 5. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **WebSocket:** ws://localhost:8080
- **MinIO Console:** http://localhost:9001

## 🛠️ Development

### Run Frontend Only

```bash
npm run dev:frontend
```

### Run Backend Only

```bash
npm run dev:backend
```

### Run Both (Concurrently)

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Run Tests

```bash
npm run test
```

### Lint Code

```bash
npm run lint
```

### Format Code

```bash
npm run format
```

## 📁 Project Structure

```
Vive-code/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── hooks/         # Custom React hooks
│   │   ├── contexts/      # React contexts
│   │   ├── utils/         # Utility functions
│   │   └── styles/        # CSS styles
│   ├── public/            # Static assets
│   └── package.json
│
├── backend/               # Node.js backend server
│   ├── src/
│   │   ├── config/        # Configuration
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── utils/         # Utility functions
│   │   └── websocket/     # WebSocket server
│   └── package.json
│
├── shared/                # Shared types and utilities
│   ├── src/
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Shared utilities
│   └── package.json
│
├── docs/                  # Documentation
├── docker-compose.yml     # Docker services configuration
├── .env.example           # Environment variables template
├── package.json           # Root package.json (workspaces)
└── README.md              # This file
```

## 🔑 API Keys Setup

### Required API Keys

1. **GitHub OAuth**
   - Client ID: `Ov23liSAgzR50S1mrgwF`
   - Client Secret: Get from GitHub Developer Settings

2. **Google OAuth**
   - Client ID: `725783453267-...apps.googleusercontent.com`
   - Client Secret: Get from Google Cloud Console

3. **AI Providers**
   - OpenAI API Key
   - Gemini API Key
   - Perplexity API Key
   - OpenRouter API Key
   - Eden AI API Key
   - Longcat AI API Key

4. **Netlify**
   - Client ID: For deployment integration
   - Client Secret: For deployment integration

All API keys should be added to your `.env` file. See `.env.example` for the complete list.

## 🎯 Usage Examples

### Creating a New Project

1. Sign in with GitHub or Google
2. Click "New Project" on the dashboard
3. Choose a template or start from scratch
4. Start coding!

### Using AI Assistance

1. Open any project in the editor
2. Select code or ask a question in the AI panel
3. Choose your preferred AI provider
4. Get instant code suggestions and explanations

### Deploying to Netlify

1. Open your project
2. Click "Deploy" button
3. Select Netlify
4. Your app is live in seconds!

### Creating a Classroom

1. Switch to Education mode
2. Click "Create Classroom"
3. Invite students via email or link
4. Create and assign coding projects

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with inspiration from Replit, CodeSandbox, and GitHub Codespaces
- Monaco Editor by Microsoft
- All open-source contributors

## 📞 Support

- 📧 Email: support@vivecode.io
- 💬 Discord: [Join our community](https://discord.gg/vivecode)
- 🐛 Issues: [GitHub Issues](https://github.com/appbuilder2903/Vive-code/issues)
- 📚 Docs: [Full Documentation](https://docs.vivecode.io)

## 🗺️ Roadmap

- [ ] Mobile apps (iOS & Android)
- [ ] VSCode extension
- [ ] Jupyter Notebook support
- [ ] GPU support for ML workloads
- [ ] Team workspaces
- [ ] Advanced analytics
- [ ] API marketplace
- [ ] Plugin system
- [ ] Offline mode

---

<div align="center">

**Built with ❤️ by the Vive Code Team**

[Website](https://vivecode.io) • [Documentation](https://docs.vivecode.io) • [Blog](https://blog.vivecode.io)

</div>