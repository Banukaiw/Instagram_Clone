import './MessageWindow.css';
import { useNavigate } from 'react-router-dom';

function MessageWindow({ onClose }) {
  const navigate = useNavigate();
  return (
    <div className="message-window">

      
      <div className="message-window-header">
        <h2>Messages</h2>
        <div className="message-window-actions">
         
          <button className="message-header-btn"
          onClick={() => navigate('/messages')}>
            <i className="bi bi-arrows-angle-expand"></i>
          </button>
   
          <button
            className="message-header-btn"
            onClick={onClose}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      </div>
      
      <div className="message-divider"></div>
      
      <div className="message-empty">

        <p>
          Chats will appear here after you send or receive a
          message
        </p>

      </div>

      <button className="new-message-btn">
        <i className="bi bi-pencil-square"></i>
      </button>

    </div>
  );
}

export default MessageWindow;