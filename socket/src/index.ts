import { Server, Socket } from 'socket.io';
import http from 'http';
import { env } from './config/envConfig';
import { produceMessage } from './kafka/producer';

const createSocketServer = () => {
  const server = http.createServer();

  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id);

    socket.on('join', (userId: string) => {
      const roomName = `userid-${userId}`;
      socket.join(roomName);
      console.log(`User ${userId} joined room ${roomName}`);
    });

    socket.on('message', async (message) => {
      console.log('message', message);
      await produceMessage('chat-messages', JSON.stringify(message));
      console.log('Message sent to Kafka:', message);

      socket.emit('message-status', {
        status: 'queued',
        messageId: message.id,
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  server.listen(env.PORT, () => {
    console.log(`🚀 Socket server running on port ${env.PORT}`);
  });

  return io;
};

createSocketServer();
