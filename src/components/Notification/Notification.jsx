import { useEffect, useState } from 'react';
import { useContext } from "react";
import { fetchNotifications } from '../../services/api';
import { ThemeContext } from "../../context/ThemeContext";
import './Notification.css';

function Notification({ onClose }) {
  const [notifications, setNotifications] = useState([]);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    fetchNotifications()
      .then((data) => {
        setNotifications(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={darkMode ? 'notification-panel dark' : 'notification-panel'}>
    <div className="notification-panel">
      <div className="notification-header">
        <h2>Notifications</h2>
        <button
          className="notification-close-btn"
          onClick={onClose}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      <div className="notification-tabs">
        <button className="notification-tab active">
          All
        </button>

        <button className="notification-tab">
          People you follow
        </button>

        <button className="notification-tab">
          Comments
        </button>

        <button className="notification-tab">
          Follows
        </button>

        <button className="notification-tab">
          Tags
        </button>
      </div>

      <div className="notification-content">
        <h3>This week</h3>

        {notifications.map((notification) => (
          <div
            className="notification-item"
            key={notification.id}
          >

            <div className="notification-profile">
              <img
                src={notification.profileImage}
                alt={notification.username}
              />
            </div>

            <div className="notification-text">
              <p>
                <strong>{notification.username}</strong>{' '}
                {notification.message}
              </p>

              <span>{notification.time}</span>
            </div>

            <div className="notification-icon">
              {notification.type === 'like' && (
                <i className="bi bi-heart-fill"></i>
              )}

              {notification.type === 'comment' && (
                <i className="bi bi-chat-fill"></i>
              )}

              {notification.type === 'follow' && (
                
                <a href="#">Follow</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Notification;