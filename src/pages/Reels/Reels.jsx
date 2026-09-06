
import { useEffect, useRef, useState } from 'react';
import { fetchReels } from '../../services/api';
import './Reels.css';

function Reels() {
  const [reels, setReels] = useState([]);

  // Store references to all video elements
  const videoRefs = useRef([]);
  const reelsContainerRef = useRef(null);

  const scrollReel = (direction) => {
    if (!reelsContainerRef.current) return;

    const container = reelsContainerRef.current;

    const reelHeight = container.clientHeight;

    container.scrollBy({
      top: direction === 'down' ? reelHeight : -reelHeight,
      behavior: 'smooth',
    });
  };

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

  useEffect(() => {
    if (reels.length === 0) return;

    // Create observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.isIntersecting) {
            // Pause all other videos
            videoRefs.current.forEach((otherVideo) => {
              if (otherVideo && otherVideo !== video) {
                otherVideo.pause();
              }
            });

            // Play the visible video
            video.play().catch((error) => {
              console.log('Video autoplay prevented:', error);
            });
          } else {
            // Pause video when it is no longer visible
            video.pause();
          }
        });
      },
      {
        // Video must be 70% visible before it starts playing
        threshold: 0.7,
      }
    );

    // Observe every video
    videoRefs.current.forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    // Cleanup observer
    return () => {
      observer.disconnect();
    };
  }, [reels]);

  return (
    <div className="reels-page">
      <div className="reels-container" ref={reelsContainerRef}>

        {reels.map((reel, index) => (
          <div className="reel" key={reel.id}>

            {/* Video */}
            <video
              ref={(video) => {
                videoRefs.current[index] = video;
              }}
              src={reel.video}
              className="reel-video"
              loop
              muted
              playsInline
              preload="metadata"
            />

            {/* Left side - Profile and Caption */}
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
                <i class="bi bi-repeat"></i>
              </button>

              <button className="reel-action-btn">
                <i className="bi bi-send"></i>
              </button>
              <button className="reel-action-btn">
                <i class="bi bi-bookmark"></i>
              </button>

              <button className="reel-action-btn">
                <i className="bi bi-three-dots"></i>
              </button>

            </div>

          </div>
        ))}

      </div>

      <div className="reel-scroll-buttons">

      <button
        className="reel-scroll-btn"
        onClick={() => scrollReel('up')}
        aria-label="Previous reel"
      >
        <i className="bi bi-chevron-up"></i>
      </button>

      <button
        className="reel-scroll-btn"
        onClick={() => scrollReel('down')}
        aria-label="Next reel"
      >
        <i className="bi bi-chevron-down"></i>
      </button>

    </div>

    </div>
  );
}

export default Reels;

