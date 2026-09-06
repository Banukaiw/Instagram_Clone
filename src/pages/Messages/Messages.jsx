import { useEffect, useState } from 'react';
import './Messages.css';

const API_URL = 'http://localhost:3000';
const WS_URL = 'ws://localhost:8081';

function Messages() {
  const [conversations, setConversations] = useState([]);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [socket, setSocket] = useState(null);
  const [messageText, setMessageText] = useState('');

  // Currently logged-in user
  const currentUserId = '1';

  // WebSocket connection
  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log('✅ Connected to WebSocket server');
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);

      console.log('📩 New message received:', newMessage);

      setMessages((prevMessages) => [
        ...prevMessages,
        newMessage
      ]);
    };

    ws.onclose = () => {
      console.log('🔴 Disconnected from WebSocket server');
    };

    ws.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, []);


  // Fetch conversations
  useEffect(() => {
    fetch(`${API_URL}/conversations`)
      .then((response) => response.json())
      .then((data) => {
        setConversations(data);
      })
      .catch((error) => {
        console.error('Error fetching conversations:', error);
      });
  }, []);

  // Fetch users
  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  // Find user by ID
  const getUser = (userId) => {
    return users.find((user) => user.id === userId);
  };


  // Get other participant
  const getOtherUser = (conversation) => {
    const otherUserId = conversation.participants.find(
      (id) => id !== currentUserId
    );

    return getUser(otherUserId);
  };

  // Select conversation
  const openConversation = (conversation) => {
    setSelectedConversation(conversation);

    fetch(
      `${API_URL}/messages?conversationId=${conversation.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        console.error('Error fetching messages:', error);
      });
  };

  const sendMessage = () => {
  if (!messageText.trim()) {
    return;
  }

  if (!selectedConversation) {
    return;
  }

  if (!socket || socket.readyState !== WebSocket.OPEN) {
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
    timestamp: new Date().toISOString()
  };

  socket.send(JSON.stringify(newMessage));

  setMessageText('');
};



  return (
    <div className="messages-page">
      <div className="messages-sidebar">
        <div className="messages-header">
          <h2>Messages</h2>

          {/* <button className="new-message-btn">
            <i className="bi bi-pencil-square"></i>
          </button> */}
        </div>

        <div className="message-search">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search"/>
        </div>

        <div className="conversation-list">
          {conversations.map((conversation) => {

            const user = getOtherUser(conversation);
            if (!user) {
              return null;
            }
            return (
              <div
                className="conversation"
                key={conversation.id}
                onClick={() => openConversation(conversation)}
              >
                <img
                  src={user.profilePicture}
                  alt={user.username}
                />

                <div className="conversation-info">
                  <h4>
                    {user.username}
                  </h4>

                  <p>
                    {conversation.lastMessage}
                  </p>

                </div>

                <span className="message-time">

                  {new Date(
                    conversation.lastMessageTime
                  ).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
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
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                    />
                    <h3>
                      {user.username}
                    </h3>
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
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      sendMessage();
                    }
                  }}
                />
                <button onClick={sendMessage}>
                  Send
                 
                </button>
              </div>

          </div>

        ) : (

          <div className="empty-chat">
            <h2>Your Messages</h2>
            <p>
              Send private photos and messages to a friend or group.
            </p>
            <button className="send-message-btn">
              Send message
            </button>
          </div>
        )}

      </div>

    </div>
  );
}

export default Messages;