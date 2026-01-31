# Vive Code API Documentation

## Base URL

```
Development: http://localhost:5000/api
Production: https://api.vivecode.io/api
```

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## Endpoints

### Authentication

#### GitHub OAuth
```
GET /auth/github
```
Redirects to GitHub OAuth login.

#### GitHub OAuth Callback
```
GET /auth/github/callback
```
Handles GitHub OAuth callback.

#### Google OAuth
```
GET /auth/google
```
Redirects to Google OAuth login.

#### Google OAuth Callback
```
GET /auth/google/callback
```
Handles Google OAuth callback.

#### Get Current User
```
GET /auth/me
```
Returns currently authenticated user.

**Response:**
```json
{
  "id": "user-id",
  "email": "user@example.com",
  "username": "username",
  "role": "user"
}
```

#### Logout
```
POST /auth/logout
```
Logs out the current user.

### Projects

#### List Projects
```
GET /projects
```
Returns all projects for the authenticated user.

**Response:**
```json
{
  "projects": [
    {
      "id": "project-id",
      "name": "My Project",
      "description": "Project description",
      "language": "javascript",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "total": 1
}
```

#### Get Project
```
GET /projects/:id
```
Returns a specific project.

#### Create Project
```
POST /projects
```

**Request Body:**
```json
{
  "name": "New Project",
  "description": "Project description",
  "language": "javascript",
  "templateId": "template-id" // optional
}
```

**Response:**
```json
{
  "id": "new-project-id",
  "name": "New Project",
  "ownerId": "user-id",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Update Project
```
PUT /projects/:id
```

#### Delete Project
```
DELETE /projects/:id
```

#### Get Project Files
```
GET /projects/:id/files
```

#### Save File
```
POST /projects/:id/files
```

**Request Body:**
```json
{
  "path": "/src/index.js",
  "content": "console.log('Hello');"
}
```

### AI

#### AI Chat
```
POST /ai/chat
```

**Request Body:**
```json
{
  "provider": "openai",
  "prompt": "Explain this code",
  "context": "const x = 5;",
  "model": "gpt-4" // optional
}
```

**Response:**
```json
{
  "provider": "openai",
  "model": "gpt-4",
  "response": "This code declares a constant variable...",
  "tokensUsed": 50
}
```

#### Get AI Usage
```
GET /ai/usage
```

**Response:**
```json
{
  "promptsUsed": 50,
  "promptsLimit": 1000,
  "weekStartDate": "2024-01-01T00:00:00Z"
}
```

### Code Execution

#### Execute Code
```
POST /execute
```

**Request Body:**
```json
{
  "language": "javascript",
  "code": "console.log('Hello');",
  "input": "", // optional
  "environmentVars": {} // optional
}
```

**Response:**
```json
{
  "success": true,
  "output": "Hello\n",
  "error": null,
  "exitCode": 0,
  "executionTime": 123
}
```

### Templates

#### List Templates
```
GET /templates
```

**Response:**
```json
{
  "templates": [
    {
      "id": "template-id",
      "name": "React App",
      "description": "A React application starter",
      "language": "javascript",
      "framework": "react",
      "category": "web"
    }
  ]
}
```

#### Get Template
```
GET /templates/:id
```

#### Create Template
```
POST /templates
```

### Collaboration

#### Get Collaborators
```
GET /collaboration/:projectId/collaborators
```

#### Add Collaborator
```
POST /collaboration/:projectId/collaborators
```

**Request Body:**
```json
{
  "userId": "user-id",
  "permission": "editor" // viewer, editor, or admin
}
```

#### Remove Collaborator
```
DELETE /collaboration/:projectId/collaborators/:userId
```

### Deployment

#### Deploy to Netlify
```
POST /deployment/:projectId/netlify
```

**Response:**
```json
{
  "id": "deployment-id",
  "provider": "netlify",
  "url": "https://your-app.netlify.app",
  "status": "deployed"
}
```

#### Get Deployment Status
```
GET /deployment/:deploymentId
```

### Education

#### List Classrooms
```
GET /education/classrooms
```

#### Create Classroom
```
POST /education/classrooms
```

**Request Body:**
```json
{
  "name": "CS 101",
  "description": "Introduction to Computer Science"
}
```

#### Get Assignments
```
GET /education/classrooms/:classroomId/assignments
```

#### Create Assignment
```
POST /education/classrooms/:classroomId/assignments
```

**Request Body:**
```json
{
  "title": "Assignment 1",
  "description": "Build a calculator",
  "dueDate": "2024-12-31T23:59:59Z",
  "maxScore": 100
}
```

#### Submit Assignment
```
POST /education/assignments/:assignmentId/submit
```

**Request Body:**
```json
{
  "projectId": "project-id"
}
```

#### Grade Submission
```
POST /education/submissions/:submissionId/grade
```

**Request Body:**
```json
{
  "score": 95,
  "feedback": "Great work!"
}
```

### Users

#### Get Profile
```
GET /users/profile
```

#### Update Profile
```
PUT /users/profile
```

**Request Body:**
```json
{
  "displayName": "New Name",
  "bio": "About me"
}
```

## WebSocket API

Connect to: `ws://localhost:8080/ws`

### Message Format

All messages are JSON:

```json
{
  "type": "MESSAGE_TYPE",
  "payload": {},
  "userId": "user-id",
  "projectId": "project-id",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Message Types

- `USER_JOIN` - Join a project
- `USER_LEAVE` - Leave a project
- `CURSOR_MOVE` - Cursor position update
- `FILE_CHANGE` - File content change
- `CHAT_MESSAGE` - Chat message
- `SYNC_REQUEST` - Request state sync
- `SYNC_RESPONSE` - State sync response

### Example: Join Project

**Send:**
```json
{
  "type": "USER_JOIN",
  "userId": "user-id",
  "projectId": "project-id",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

### Example: File Change

**Send:**
```json
{
  "type": "FILE_CHANGE",
  "payload": {
    "path": "/src/index.js",
    "content": "console.log('Hello');",
    "changes": []
  },
  "userId": "user-id",
  "projectId": "project-id",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message",
  "statusCode": 400
}
```

### Common Status Codes

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error

## Rate Limiting

- Default: 100 requests per 15 minutes
- AI endpoints: Subject to weekly prompt limits (1000/week)
- Authenticated users have higher limits

## Pagination

List endpoints support pagination:

```
GET /projects?page=1&perPage=20
```

Response includes:
```json
{
  "items": [],
  "page": 1,
  "perPage": 20,
  "total": 100,
  "totalPages": 5
}
```
