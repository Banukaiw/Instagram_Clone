


import { useEffect, useState } from 'react';
import { fetchReels } from '../../services/api';
import './Reels.css';

function Reels() {
  const [reels, setReels] = useState([]);

  useEffect(() => {
    const loadReels = async () => {
      try {
        const data = await fetchReels();
        setReels(data);
      } catch (error) {
        console.error('Error fetching reels:', error);
      }
    };

    loadReels();
  }, []);

  return (
    <div className="reels-page">
      <div className="reels-container">
        {reels.map((reel) => (
          <div className="reel-card" key={reel.id}>
            
            {/* User Info & Caption Section - Left Side Bottom */}
            <div className="reel-left-info">
              <div className="reel-user-row">
                <img
                  src={reel.profileImage}
                  alt={reel.username}
                  className="reel-profile-img"
                />
                <span className="reel-username">{reel.username}</span>
                <button className="follow-btn">Follow</button>
              </div>

              <p className="reel-caption">{reel.caption}</p>
            </div>

            {/* Video Box */}
            <div className="reel-media-container">
              <video
                src={reel.video}
                className="reel-video"
                loop
                muted
                playsInline
                autoPlay
              />
            </div>

            {/* Action Buttons - Right Side Bottom */}
            <div className="reel-actions">
              <button className="reel-action-btn" aria-label="Like">
                <i className="bi bi-heart"></i>
                <span>{reel.likes}</span>
              </button>

              <button className="reel-action-btn" aria-label="Comment">
                <i className="bi bi-chat"></i>
                <span>{reel.comments}</span>
              </button>

              <button className="reel-action-btn" aria-label="Share">
                <i className="bi bi-send"></i>
              </button>

              <button className="reel-action-btn" aria-label="More options">
                <i className="bi bi-three-dots"></i>
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Reels;