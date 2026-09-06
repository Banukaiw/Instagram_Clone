
import { useEffect, useState } from 'react';
import { fetchPosts, updateUser } from '../../services/api';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));

    if (loggedUser) {
      setUser(loggedUser);

      // Put current user details into the edit form
      setUsername(loggedUser.username);
      setFullName(loggedUser.fullName);
      setProfilePicture(loggedUser.profilePicture);

      // Get posts and count only this user's posts
      fetchPosts()
        .then((posts) => {
          const userPosts = posts.filter(
            (post) => String(post.user.id) === String(loggedUser.id)
          );

          setPostCount(userPosts.length);
        })
        .catch((err) => {
          console.log('Posts fetch error:', err);
        });
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setUsername(user.username);
    setFullName(user.fullName);
    setProfilePicture(user.profilePicture);

    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsSaving(true);

    const updatedData = {
      username: username,
      fullName: fullName,
      profilePicture: profilePicture,
    };

    try {
      const updatedUser = await updateUser(user.id, updatedData);
e
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setIsEditing(false);

      console.log('Profile updated successfully');
    } catch (error) {
      console.log('Profile update error:', error);
      alert('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-page">

      {!isEditing ? (
        <>     
          <div className="profile-header">   
            <div className="profile-image-container">
              <img
                src={user.profilePicture}
                alt="Profile"
                className="profile-image"
              />
            </div>
            
            <div className="profile-info">           
              <div className="profile-username-row">
                <h2 className="profile-username">
                  {user.username}
                </h2>

                <span className="settings-icon">⚙</span>
              </div>

              <p className="profile-fullname">
                {user.fullName}
              </p>

              <div className="profile-stats">
                <span>
                  <strong>{postCount}</strong> posts
                </span>

                <span>
                  <strong>0</strong> followers
                </span>

                <span>
                  <strong>0</strong> following
                </span>

              </div>
            </div>
          </div>

        
          <div className="profile-buttons">
            <button onClick={handleEditClick}>
              Edit profile
            </button>

            <button>
              View archive
            </button>
          </div>
        </>
      ) : (
        <>
          
          <div className="edit-profile">
            <h2>Edit Profile</h2>
            <div className="edit-profile2">
             
              <div className="edit-profile-image">
                <img
                  src={profilePicture}
                  alt="Profile preview"
                  className="profile-image"
                />
              </div>


              <div className="edit-profile-form">             
                <label>
                  Profile Image URL
                </label>

                <input
                  type="text"
                  value={profilePicture}
                  onChange={(e) => setProfilePicture(e.target.value)}
                  placeholder="Enter image URL"
                />
              
                <label>
                  Username
                </label>

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                />
           
                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter full name"
                />
              </div>
            </div>

            
            <div className="edit-profile-buttons">
              <button className="save-button"onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save'}
              </button>

              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;

