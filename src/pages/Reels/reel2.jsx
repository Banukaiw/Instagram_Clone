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
          <div className="reel" key={reel.id}>

            {/* Video */}
            <video
              src={reel.video}
              className="reel-video"
              loop
              muted
              playsInline
            />

                        {/* Left side - Profile and caption */}
            <div className="reel-info">

              <div className="reel-user">
                <img
                  src={reel.profileImage}
                  alt={reel.username}
                  className="reel-profile-img"
                />

                <strong>{reel.username}</strong>

                <button className="follow-btn">
                  Follow
                </button>
              </div>

              <p className="reel-caption">
                {reel.caption}
              </p>

            </div>

            {/* Right side - Actions */}
            <div className="reel-actions">

              <button className="reel-action-btn">
                <i className="bi bi-heart"></i>
                <span>{reel.likes}</span>
              </button>

              <button className="reel-action-btn">
                <i className="bi bi-chat"></i>
                <span>{reel.comments}</span>
              </button>

              <button className="reel-action-btn">
                <i className="bi bi-send"></i>
              </button>

              <button className="reel-action-btn">
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
