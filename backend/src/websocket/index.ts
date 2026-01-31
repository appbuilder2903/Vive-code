import { Server as HTTPServer } from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import { logger } from '../utils/logger';
import { WSMessage, WSMessageType } from '@vivecode/shared';

interface Client {
  ws: WebSocket;
  userId?: string;
  projectId?: string;
}

const clients = new Map<string, Client>();

export function initWebSocketServer(server: HTTPServer): void {
  const wss = new WebSocketServer({ server, path: '/ws' });

  logger.info('WebSocket server initialized');

  wss.on('connection', (ws: WebSocket) => {
    const clientId = generateClientId();
    clients.set(clientId, { ws });

    logger.info(`Client connected: ${clientId}`);

    ws.on('message', (data: Buffer) => {
      try {
        const message: WSMessage = JSON.parse(data.toString());
        handleMessage(clientId, message);
      } catch (error) {
        logger.error('Error parsing WebSocket message:', error);
      }
    });

    ws.on('close', () => {
      const client = clients.get(clientId);
      if (client?.projectId && client?.userId) {
        broadcastToProject(client.projectId, {
          type: WSMessageType.USER_LEAVE,
          payload: { userId: client.userId },
          timestamp: new Date(),
        }, clientId);
      }
      clients.delete(clientId);
      logger.info(`Client disconnected: ${clientId}`);
    });

    ws.on('error', (error) => {
      logger.error(`WebSocket error for client ${clientId}:`, error);
    });
  });
}

function handleMessage(clientId: string, message: WSMessage): void {
  const client = clients.get(clientId);
  if (!client) return;

  switch (message.type) {
    case WSMessageType.USER_JOIN:
      client.userId = message.userId;
      client.projectId = message.projectId;
      broadcastToProject(message.projectId!, message, clientId);
      break;

    case WSMessageType.CURSOR_MOVE:
    case WSMessageType.FILE_CHANGE:
    case WSMessageType.CHAT_MESSAGE:
      if (client.projectId) {
        broadcastToProject(client.projectId, message, clientId);
      }
      break;

    case WSMessageType.SYNC_REQUEST:
      // TODO: Send current project state to client
      break;

    default:
      logger.warn(`Unknown message type: ${message.type}`);
  }
}

function broadcastToProject(projectId: string, message: WSMessage, excludeClientId?: string): void {
  clients.forEach((client, id) => {
    if (client.projectId === projectId && id !== excludeClientId) {
      if (client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(JSON.stringify(message));
      }
    }
  });
}

function generateClientId(): string {
  // Note: For production, consider using a UUID library for more robust unique ID generation
  return `client-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}
