import WebSocket, { WebSocketServer } from 'ws';
import fs from 'fs';

const PORT = 8081;
const DB_FILE = './db/db.json';

const wss = new WebSocketServer({ port: PORT });

console.log(`WebSocket server running on ws://localhost:${PORT}`);

wss.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', (data) => {
    try {
      const newMessage = JSON.parse(data);

      console.log('Message received:', newMessage);

      // Read db.json
      const dbData = JSON.parse(
        fs.readFileSync(DB_FILE, 'utf-8')
      );

      // Add the new message
      dbData.messages.push(newMessage);

      // Update conversation
      const conversation = dbData.conversations.find(
        (conversation) =>
          conversation.id === newMessage.conversationId
      );

      if (conversation) {
        conversation.lastMessage = newMessage.text;
        conversation.lastMessageTime = newMessage.timestamp;
      }

      // Save updated data to db.json
      fs.writeFileSync(
        DB_FILE,
        JSON.stringify(dbData, null, 2)
      );

      console.log('✅ Message saved to db.json');

      // Send message to all connected clients
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