import WebSocket, { WebSocketServer } from 'ws';
import fs from 'fs/promises';

const PORT = 8081;
const DB_FILE = './db/db.json';

const wss = new WebSocketServer({ port: PORT });

console.log(`WebSocket server running on ws://localhost:${PORT}`);

wss.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', async (data) => {
    try {
      const newMessage = JSON.parse(data);
      console.log('Message received:', newMessage);

      // 1. Read db.json asynchronously
      const rawData = await fs.readFile(DB_FILE, 'utf-8');
      const dbData = JSON.parse(rawData);

      // 2. Add new message
      dbData.messages.push(newMessage);

      // 3. Update conversation lastMessage & time
      const conversation = dbData.conversations.find(
        (c) => c.id === newMessage.conversationId
      );

      if (conversation) {
        conversation.lastMessage = newMessage.text;
        conversation.lastMessageTime = newMessage.timestamp;
      }

      // 4. Save to db.json asynchronously
      await fs.writeFile(DB_FILE, JSON.stringify(dbData, null, 2));
      console.log('✅ Message saved to db.json');

      // 5. Broadcast to ALL connected clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(newMessage));
        }
      });

    } catch (error) {
      console.error('❌ Error processing message:', error);
    }
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });

  socket.on('error', (error) => {
    console.error('❌ WebSocket error:', error);
  });
});