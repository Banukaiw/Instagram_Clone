import { useEffect, useState, useRef } from 'react';
import './Messages.css';

const API_URL = 'http://localhost:3000';
const WS_URL = 'ws://localhost:8081';

function Messages() {
  const [conversations, setConversations] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState('');
  
  const socketRef = useRef(null);

  const urlParams = new URLSearchParams(window.location.search);
  const currentUserId = urlParams.get('userId') || '1';

  const selectedConvRef = useRef(selectedConversation);
  useEffect(() => {
    selectedConvRef.current = selectedConversation;
  }, [selectedConversation]);

  // WebSocket Connection
  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    socketRef.current = ws;

    ws.onopen = () => console.log('✅ Connected to WebSocket server');

    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      console.log('📩 New message received:', newMessage);


      if (
        selectedConvRef.current &&
        selectedConvRef.current.id === newMessage.conversationId
      ) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }


      setConversations((prevConversations) =>
        prevConversations.map((conv) => {
          if (conv.id === newMessage.conversationId) {
            return {
              ...conv,
              lastMessage: newMessage.text,
              lastMessageTime: newMessage.timestamp,
            };
          }
          return conv;
        })
      );
    };

    ws.onclose = () => console.log('🔴 Disconnected from WebSocket server');
    ws.onerror = (error) => console.error('❌ WebSocket error:', error);

    return () => {
      ws.close();
    };
  }, []);

  // Fetch Conversations
  useEffect(() => {
    fetch(`${API_URL}/conversations`)
      .then((res) => res.json())
      .then((data) => {

        const userConversations = data.filter((c) =>
          c.participants.includes(currentUserId)
        );
        setConversations(userConversations);
      })
      .catch((err) => console.error('Error fetching conversations:', err));
  }, [currentUserId]);

  // Fetch Users
  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  const getUser = (userId) => users.find((user) => user.id === userId);

  const getOtherUser = (conversation) => {
    const otherUserId = conversation.participants.find(
      (id) => id !== currentUserId
    );
    return getUser(otherUserId);
  };

  const openConversation = (conversation) => {
    setSelectedConversation(conversation);

    fetch(`${API_URL}/messages?conversationId=${conversation.id}`)
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error('Error fetching messages:', err));
  };

  const sendMessage = () => {
    if (!messageText.trim() || !selectedConversation) return;

    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      console.log('WebSocket is not connected');
      return;
    }

    const otherUserId = selectedConversation.participants.find(
      (id) => id !== currentUserId
    );

    const newMessage = {
      id: Date.now().toString(),
      conversationId: selectedConversation.id,
      senderId: currentUserId,
      receiverId: otherUserId,
      text: messageText,
      timestamp: new Date().toISOString(),
    };

    socketRef.current.send(JSON.stringify(newMessage));
    setMessageText('');
  };

  return (
    <div className="messages-page">
      <div className="messages-sidebar">
        <div className="messages-header">
        
        </div>

        <div className="message-search">
          <i className="bi bi-search"></i>
          <input type="text" placeholder="Search" />
        </div>

        <div className="conversation-list">
          {conversations.map((conversation) => {
            const user = getOtherUser(conversation);
            if (!user) return null;

            return (
              <div
                className={`conversation ${
                  selectedConversation?.id === conversation.id ? 'active' : ''
                }`}
                key={conversation.id}
                onClick={() => openConversation(conversation)}
              >
                <img src={user.profilePicture} alt={user.username} />
                <div className="conversation-info">
                  <h4>{user.username}</h4>
                  <p>{conversation.lastMessage}</p>
                </div>
                <span className="message-time">
                  {conversation.lastMessageTime &&
                    new Date(conversation.lastMessageTime).toLocaleTimeString(
                      [],
                      { hour: '2-digit', minute: '2-digit' }
                    )}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="message-chat">
        {selectedConversation ? (
          <div className="chat-window">
            <div className="chat-header">
              {(() => {
                const user = getOtherUser(selectedConversation);
                return (
                  <>
                    <img src={user?.profilePicture} alt={user?.username} />
                    <h3>{user?.username}</h3>
                  </>
                );
              })()}
            </div>

            <div className="chat-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.senderId === currentUserId
                      ? 'message-bubble sent'
                      : 'message-bubble received'
                  }
                >
                  {message.text}
                </div>
              ))}
            </div>

            <div className="chat-input">
              <input
                type="text"
                placeholder="Message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        ) : (
          <div className="empty-chat">
            <h2>Your Messages</h2>
            <p>Send private photos and messages to a friend or group.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;