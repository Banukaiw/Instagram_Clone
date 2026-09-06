// src/components/Suggestions/Suggestions.jsx

import { useState, useEffect } from 'react';
import { fetchSuggestions } from '../../services/api';
import { Link } from 'react-router-dom';
import './Suggestions.css';

const Suggestions = () => {
  const [profile, setProfile] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));

    if (loggedUser) {
      setProfile(loggedUser);
    }

    fetchSuggestions()
      .then((data) => setSuggestions(data))
      .catch((err) =>
        console.log('Suggestions fetch error:', err)
      );
  }, []);

  return (
    <div className="suggestions">

      {profile ? (
        <div className="suggestions-profile">

          <Link to="/profile" className="suggestions-profile-link">
            <img
              src={profile.profilePicture}
              alt="Profile"
              className="suggestions-profile-dp"
            />
          </Link>

          <div className="suggestions-profile-info">

            <Link
              to="/profile"
              className="suggestions-profile-username"
            >
              {profile.username}
            </Link>

            <span className="suggestions-profile-name">
              {profile.fullName}
            </span>

          </div>

          <button className="suggestions-switch">
            Switch
          </button>

        </div>
      ) : (
        <p className="suggestions-loading">
          Loading...
        </p>
      )}

      <div className="suggestions-header">

        <span className="suggestions-header-title">
          Suggested for you
        </span>

        <button className="suggestions-see-all">
          See All
        </button>

      </div>

      <div className="suggestions-list">

        {suggestions.length > 0 ? (

          suggestions.map((suggestion) => (

            <div
              key={suggestion.id}
              className="suggestion-item"
            >
              <img
                src={suggestion.profile_pic}
                alt={suggestion.username}
                className="suggestion-user-dp"
              />

              <div className="suggestion-info">
                <span className="suggestion-username">
                  {suggestion.username}
                </span>

                <span className="suggestion-reason">
                  Suggested for you
                </span>
              </div>

              <button className="suggestion-follow">
                Follow
              </button>
            </div>
          ))

        ) : (

          <p className="suggestions-loading">
            Loading...
          </p>

        )}
        <div className="bottomnav">
          <div className="bottomnav-list">
            <a href="#">About</a> .
            <a href="#"> Help</a> .
            <a href="#"> Pres</a> .
            <a href="#">  Jobs</a> .
            <a href="#"> Terms</a> .<br />
            <a href="#"> Locations</a> .
            <a href="#"> Language</a> .
            <a href="#"> Meta Verified</a> .
          </div>

          <div className="bottomnav-copy">© 2026 Instagram from Meta</div>
        </div>
      </div>

    </div>
  );
};

export default Suggestions;