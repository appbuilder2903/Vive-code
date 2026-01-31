// User Types
export interface User {
  id: string;
  email: string;
  username: string;
  displayName?: string;
  avatarUrl?: string;
  role: UserRole;
  githubId?: string;
  googleId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'admin',
  TEACHER = 'teacher',
  STUDENT = 'student',
  USER = 'user',
}

// Project Types
export interface Project {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  visibility: ProjectVisibility;
  language: string;
  framework?: string;
  templateId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ProjectVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
  UNLISTED = 'unlisted',
}

// File System Types
export interface FileNode {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'directory';
  content?: string;
  size?: number;
  children?: FileNode[];
  createdAt: Date;
  updatedAt: Date;
}

// AI Provider Types
export enum AIProvider {
  OPENAI = 'openai',
  GEMINI = 'gemini',
  PERPLEXITY = 'perplexity',
  OPENROUTER = 'openrouter',
  EDEN_AI = 'eden_ai',
  LONGCAT_AI = 'longcat_ai',
}

export interface AIRequest {
  provider: AIProvider;
  model?: string;
  prompt: string;
  context?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AIResponse {
  provider: AIProvider;
  model: string;
  response: string;
  tokensUsed: number;
  cost?: number;
}

// Collaboration Types
export interface Collaborator {
  userId: string;
  projectId: string;
  permission: CollaborationPermission;
  joinedAt: Date;
}

export enum CollaborationPermission {
  VIEWER = 'viewer',
  EDITOR = 'editor',
  ADMIN = 'admin',
}

export interface CursorPosition {
  userId: string;
  fileId: string;
  line: number;
  column: number;
  color?: string;
}

// Execution Types
export interface ExecutionRequest {
  projectId: string;
  language: string;
  code: string;
  input?: string;
  environmentVars?: Record<string, string>;
}

export interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  exitCode: number;
  executionTime: number;
}

// Template Types
export interface Template {
  id: string;
  name: string;
  description: string;
  language: string;
  framework?: string;
  category: TemplateCategory;
  files: FileNode[];
  authorId: string;
  downloads: number;
  rating?: number;
  createdAt: Date;
}

export enum TemplateCategory {
  WEB = 'web',
  API = 'api',
  MOBILE = 'mobile',
  GAME = 'game',
  DATA = 'data',
  ML = 'ml',
  EDUCATION = 'education',
  OTHER = 'other',
}

// Education Types
export interface Classroom {
  id: string;
  name: string;
  description?: string;
  teacherId: string;
  studentIds: string[];
  createdAt: Date;
}

export interface Assignment {
  id: string;
  classroomId: string;
  title: string;
  description: string;
  dueDate: Date;
  templateId?: string;
  maxScore: number;
  createdAt: Date;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  projectId: string;
  score?: number;
  feedback?: string;
  submittedAt: Date;
  gradedAt?: Date;
}

// Deployment Types
export interface Deployment {
  id: string;
  projectId: string;
  provider: DeploymentProvider;
  url: string;
  status: DeploymentStatus;
  buildLogs?: string;
  createdAt: Date;
}

export enum DeploymentProvider {
  NETLIFY = 'netlify',
  INTERNAL = 'internal',
}

export enum DeploymentStatus {
  PENDING = 'pending',
  BUILDING = 'building',
  DEPLOYED = 'deployed',
  FAILED = 'failed',
}

// WebSocket Message Types
export interface WSMessage {
  type: WSMessageType;
  payload: unknown;
  userId?: string;
  projectId?: string;
  timestamp: Date;
}

export enum WSMessageType {
  CURSOR_MOVE = 'cursor_move',
  FILE_CHANGE = 'file_change',
  CHAT_MESSAGE = 'chat_message',
  USER_JOIN = 'user_join',
  USER_LEAVE = 'user_leave',
  SYNC_REQUEST = 'sync_request',
  SYNC_RESPONSE = 'sync_response',
}

// Usage Tracking Types
export interface UsageStats {
  userId: string;
  aiPromptsUsed: number;
  aiPromptsLimit: number;
  storageUsed: number;
  storageLimit: number;
  computeMinutes: number;
  weekStartDate: Date;
}
