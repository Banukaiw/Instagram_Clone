import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchStories } from '../../services/api';
import './Stories.css';

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const storiesRef = useRef(null);
  const navigate = useNavigate();


  useEffect(() => {
    fetchStories()
      .then((data) => {
        setStories(data);
      })
      .catch((err) => {
        console.error('Error fetching stories:', err);
      });
  }, []);


  const checkScrollPosition = () => {
    const container = storiesRef.current;

    if (!container) return;

    const isAtStart = container.scrollLeft <= 5;

    const isAtEnd =
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - 5;

    setShowLeftButton(!isAtStart);
    setShowRightButton(!isAtEnd);
  };


  const scrollRight = () => {
    const container = storiesRef.current;

    if (!container) return;
    container.scrollBy({
      left: 250,
      behavior: 'smooth',
    });
  };


  const scrollLeft = () => {
    const container = storiesRef.current;

    if (!container) return;

    container.scrollBy({
      left: -200,
      behavior: 'smooth',
    });
  };


  useEffect(() => {
    if (stories.length === 0) return;

    const timer = setTimeout(() => {
      checkScrollPosition();
    }, 100);

    return () => clearTimeout(timer);
  }, [stories]);


  const handleStoryClick = (storyId) => {
    navigate(`/story/${storyId}`);
  };

  return (
    <div className="stories-wrapper">

      {/* Left button */}
      {showLeftButton && (
        <button
          className="stories-scroll-button stories-scroll-left"
          onClick={scrollLeft}
          aria-label="Scroll stories left"
        >
          <i className="bi bi-chevron-left"></i>
        </button>
      )}

      <div
        className="stories-container"
        ref={storiesRef}
        onScroll={checkScrollPosition}
      >
        {stories.map((story) => (
          <div
            key={story.id}
            className="story-avatar"
            onClick={() => handleStoryClick(story.id)}
          >
            <div className="gradient-border">
              <img
                src={story.userImage}
                alt={story.username}
              />
            </div>

            <p className="username">
              {story.username}
            </p>
          </div>
        ))}
      </div>


      {showRightButton && (
        <button
          className="stories-scroll-button stories-scroll-right"
          onClick={scrollRight}
          aria-label="Scroll stories right"
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      )}

    </div>
  );
}