import '../MessagePop/MessagePop.css';
import { useLocation } from 'react-router-dom';

function MessagePop({ onClick }) {
  const location = useLocation();

   if (location.pathname === '/messages') {
    return null;
  }
  return (
    <div className="message-container" onClick={onClick}>
      <div>
        <i className="bi bi-chat-dots-fill"></i>
      </div>

      <div>Messages</div>
    </div>
  );
}

export default MessagePop;