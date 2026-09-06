// src/Sidebar.jsx
import instagramTextLogo from './../../assets/instagram-text.png';
import instagramLogo from './../../assets/instagram-logo.png';

import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Create from '../../pages/Create/Create';
import './../Sidebar/Sidebar.css';
import More from '../../components/More/More';

function Sidebar({ onNotificationClick}) {

  const [showCreate, setShowCreate] = useState(false);
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="Sidebar1">
      <div className="d-flex flex-column gap-3">
        <img
          src={instagramTextLogo}
          alt="Instagram"
          className="logo-text"
        />
        <img
          src={instagramLogo}
          alt="Instagram"
          className="instalogo"
        />

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'nav-item active' : 'nav-item'
          }
        >
          <i className="bi bi-person-fill"></i>
          <span> Home</span>
        </NavLink>

        <NavLink to="/search" className={({ isActive }) =>
          isActive ? 'nav-item active' : 'nav-item'
        }>
          <i className="bi bi-search"></i> 
          <span> Search</span>
        </NavLink>

        {/* <NavLink to="/explore" className={({ isActive }) =>
          isActive ? 'nav-item active' : 'nav-item'
        }>
          <i className="bi bi-compass-fill"></i> 
          <span> Explore</span>
        </NavLink> */}

        <NavLink to="/reels" className={({ isActive }) =>
          isActive ? 'nav-item active' : 'nav-item'
        }>
          <i className="bi bi-play-btn-fill"></i> 
          <span> Reels</span>
        </NavLink>

        <NavLink to="/messages" className={({ isActive }) =>
          isActive ? 'nav-item active' : 'nav-item'
        }>
          <i className="bi bi-chat-dots-fill"></i> 
          <span> Messages</span>
        </NavLink>

        <div
          className="nav-item"
          onClick={onNotificationClick}
          style={{ cursor: 'pointer' }}
        >
          <i className="bi bi bi-heart-fill"></i>

          <span>Notifications</span>
        </div>

        <div
          className="nav-item"
          onClick={() => setShowCreate(true)}
          style={{ cursor: 'pointer', }}
        >
          <i className="bi bi-plus-square-fill"></i> 
          <span> Create</span>
        </div>

        {showCreate && (
          <div className="modal-overlay">
            <div className="modal-content">
              <Create
                onClose={() => setShowCreate(false)}
              />
            </div>
          </div>
        )}

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? 'nav-item active' : 'nav-item'
          }
        >
          <i className="bi bi-person-fill"></i> 
          <span> Profile</span>
        </NavLink>

      </div>

      {/* Bottom links - pinned to the bottom of the viewport */}
      {/* <div className="d-flex flex-column gap-3 position-fixed bottom-0 mb-3 w-64">

        <div className="nav-item">
          <i className="bi bi-threads"></i> Threads
        </div>

        <div className="nav-item">
          <i className="bi bi-list"></i> More
        </div>

      </div> */}

      <div className="sidebar-bottom">

        <div className="nav-item">
          <i className="bi bi-threads"></i>
          <span>Threads</span>
        </div>

        <div
          className="nav-item"
          onClick={() => setShowMore(prev => !prev)}
          style={{ cursor: 'pointer' }}
        >
          <i className="bi bi-list"></i>
          <span>More</span>
        </div>

        {showMore && (
          <More
            onClose={() => setShowMore(false)}
          />
        )}

      </div>

    </div>
  );
}

export default Sidebar;